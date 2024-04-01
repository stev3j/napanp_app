import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Modal, View, Text, TouchableOpacity, SafeAreaView, Image, Button, Alert } from 'react-native';
import NapnapModal from '../components/NapanpModal';
import { Background, ButtonContainer, CircleButton, Clickable, Spacer } from '../utils/UtilFunctions';
import MusicContainer from '../components/MusicContainer';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { minusMinute, minusSecond, resetTimer, setMinute, setSecond, setTimer } from '../redux/slices/timer';
import BackgroundTimer from 'react-native-background-timer';
import TextCircleButton from '../assets/buttons/TextCircleButton';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../navigation/RootStackParamList';
import ImagePaths from '../assets/images/ImagePaths';
import PlayButton from '../assets/buttons/PlayButton';
import TerminateButton from '../assets/buttons/TerminateButton';


const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const timer = useAppSelector(state => state.timer.timer);
    const dispatch = useAppDispatch()
    
    const [ isModalVisible, setModalVisible ] = useState(false)
    const [ onPlay, setPlay ] = useState(false)
    const [ isSetTimer, setIsSetTimer ] = useState(false)

    const rainAudioPath = '../assets/audios/994224335CFBBFF416.mp3'

    /** background music */
    // useEffect(() => {
    //     Sound.setCategory('Playback');
    //     const audio = new Sound(rainAudioPath, Sound.MAIN_BUNDLE, error => {
    //         if (error) {
    //             console.log('Error playing audio:', error);
    //             return;
    //         }
    //         audio.play();
    //     });
    // }, []);

    /** stop */
    useEffect(() => {
        console.log(`minute: ${+timer.minute}, second: ${+timer.second}`);
        handlingTimerStop(timer, dispatch, onPlay, setPlay, setIsSetTimer, navigation)
        
    }, [+timer.second])

    /** playing */ 
    useEffect(() => {
        handlingTimerStart(onPlay, dispatch)
    }, [onPlay])

    return (
        <Background>
            <AlarmTitle/>
            <Time isSetTimer={isSetTimer} dispatch={dispatch} setModalVisible={setModalVisible} timer={timer}/>
            
            <CatImage source={ImagePaths.BasicCat}/>
            
            <Buttons isSetTimer={isSetTimer} dispatch={dispatch} setIsSetTimer={setIsSetTimer} onPlay={onPlay} setPlay={setPlay} />

            <BackgroundMusicContainer/>
            <View style={{height: 8}}/>
            <TimerStopMusicContainer/>

            <View style={{height: 60}}/>

            <NapnapModal 
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                setIsSetTimer={setIsSetTimer}
            />
            
        </Background>
    )
}

export default HomeScreen;

interface TimeType {
    isSetTimer: any
    dispatch: any
    setModalVisible: any
    timer: any
}

const Time = ({isSetTimer, dispatch, setModalVisible, timer}: TimeType) => {
    return (
        <Clickable 
            disabled={isSetTimer ? true : false}
            onPress={() => {
                dispatch(setTimer({minute: '00', second: '00'}))
                setModalVisible(true)
            }}>
            <TimeTitle>{timer.minute+':'+timer.second}</TimeTitle>
        </Clickable>
    )
}

interface ButtonsType {
    isSetTimer: any
    dispatch: any
    setIsSetTimer: any
    onPlay: any,
    setPlay: any
}

const Buttons = ({isSetTimer, dispatch, setIsSetTimer, onPlay, setPlay}: ButtonsType) => {
    return (
        <ButtonContainer style={{opacity: isSetTimer ? 100 : 0}}>
            <TextCircleButton label='취소' onPress={() => {
                cencleAlert(dispatch, setIsSetTimer, setPlay)
                }}/>
            <Spacer/>
            <PlayButton onPlay={onPlay} playable={isSetTimer} onPress={() => {setPlay(!onPlay)}}/>
        </ButtonContainer>
    )
}


export const AlarmTitle = () => {
    return (
        <AlramContainer>
            <AlramIcon source={require('../assets/images/ic_alram.png')}/>
            <SubTitle>시간을 정해주세요</SubTitle>
        </AlramContainer>
    );
}

const handlingTimerStop = (timer: any, dispatch: any, onPlay: boolean, setPlay: any, setIsSetTimer: any, navigation: any) => {
    if (+timer.second == 0 || Number.isNaN(+timer.second-1)) {
        if (+timer.minute > 0) {
            if (+timer.second == 0) {
                setTimeout(() => {
                    dispatch(minusMinute())
                    dispatch(setSecond({second: '60'}))
                }, 1000);
            } else {
                dispatch(minusMinute())
                dispatch(setSecond({second: '59'}))
            }
            
        } else if (onPlay) {
            console.log('종료!');
            BackgroundTimer.stopBackgroundTimer()
            navigation.navigate('Finish')
            setPlay(false)
            setIsSetTimer(false)
            // TODO : 타이머 종료음 울리기
        }
    }
}

const cencleAlert = (dispatch: any, setIsSetTimer: any, setPlay: any) => {
    Alert.alert(
        "정말 타이머를 초기화 하시겠습니까?",
        "", [{
            text: "아니요",
            style: "cancel"
        }, {
            text: "네",
            onPress: () => {
                setPlay(false)
                dispatch(resetTimer())
                setIsSetTimer(false)
            },
        },
        ], { cancelable: false }
    );
}

const handlingTimerStart = (onPlay: any, dispatch: any) => {

    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            dispatch(minusSecond())
        }, 1000)
    }

    if (onPlay) {
        startTimer();
        // TODO : 백그라운드 음악 재생시키기
    } else BackgroundTimer.stopBackgroundTimer();

    return () => {
        BackgroundTimer.stopBackgroundTimer();
    }
}

type PlayButtonType = {
    onPlay: boolean,
    setPlay: any,
    playable: boolean,
}



const BackgroundMusicContainer = () => {
    return (
        <MusicContainer
            iconPath={require('../assets/images/ic_music.png')}
            title='배경음악' 
            selectedItem='추적추적 빗소리'/>
    );
}

const TimerStopMusicContainer = () => {
    return (
        <MusicContainer
            iconPath={require('../assets/images/ic_notification.png')}
            title='타이머 종료음' 
            selectedItem='알람음 1'/>
    );
}

const AlramContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 70px;
`

const AlramIcon = styled.Image`
   width: 12px;
   height: 14px;
   margin-right: 8px;
`

const CatImage = styled.Image`
    margin-top: 20px;
    width: 240px;
    height: 220px;
`

const SubTitle = styled.Text`
    font-size: 20px;
    color: ${colors.text_gray_100};
`

const TimeTitle = styled.Text`
    font-size: 80px;
    color: ${colors.text_gray_100};
`




