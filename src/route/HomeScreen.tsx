import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import NapnapModal from '../components/NapanpModal';
import { Background, ButtonContainer, Clickable, MyAlert, Spacer } from '../utils/UtilFunctions';
import MusicContainer from '../components/MusicContainer';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { minusMinute, minusSecond, setSecond, setTimer } from '../redux/slices/timer';
import BackgroundTimer from 'react-native-background-timer';
import TextCircleButton from '../assets/buttons/TextCircleButton';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../navigation/RootStackParamList';
import ImagePaths from '../assets/images/ImagePaths';
import PlayButton from '../assets/buttons/PlayButton';
import AudioPaths from '../assets/audios/AudioPaths';
import LottieView from 'lottie-react-native';
import AnimationPaths from '../assets/animatinos/AnimationPaths';

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const timer = useAppSelector(state => state.timer.timer);
    const dispatch = useAppDispatch()
    
    const [ isModalVisible, setModalVisible ] = useState(false)
    const [ onPlay, setPlay ] = useState(false)
    const [ isSetTimer, setIsSetTimer ] = useState(false) 

    const rainSound = useRef<Sound>(
        new Sound(AudioPaths.RainWav, '', error => {
            if (error) {
                console.error("error", error);
            }
        })
    );

    /** stop */
    useEffect(() => {
        console.log(`minute: ${+timer.minute}, second: ${+timer.second}`);
        handlingTimerStop(timer, dispatch, onPlay, setPlay, setIsSetTimer, navigation)
    }, [+timer.second])

    /** playing */ 
    useEffect(() => {
        handlingTimerStart(onPlay, dispatch, rainSound)
    }, [onPlay])

    return (
        <Background>
            <AlarmTitle/>
            <Time isSetTimer={isSetTimer} dispatch={dispatch} setModalVisible={setModalVisible} timer={timer}/>
            
            {/* <CatImage source={ImagePaths.BasicCat}/> */}
            <LottieView style={{marginTop: 20, width: 230, height: 230}} source={AnimationPaths.SleepyCat} autoPlay loop />
            
            <Buttons isSetTimer={isSetTimer} dispatch={dispatch} setIsSetTimer={setIsSetTimer} onPlay={onPlay} setPlay={setPlay} />

            <MusicContainer
                style={{marginBottom: 8}}
                iconPath={ImagePaths.NotificationIcon}
                title='배경음악' 
                selectedItem='추적추적 빗소리'/>
            <MusicContainer
                style={{marginBottom: 60}}
                iconPath={ImagePaths.MusicIcon}
                title='타이머 종료음' 
                selectedItem='알람음 1'/>

            <NapnapModal 
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                setIsSetTimer={setIsSetTimer}
            />
        </Background>
    )
}

export default HomeScreen;

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
        };
    }
}

const handlingTimerStart = (onPlay: any, dispatch: any, soundRef: any) => {
    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            dispatch(minusSecond())
        }, 1000)
    }

    if (onPlay) {
        console.log('background sound on!');
        startTimer();
        soundRef.current.setNumberOfLoops(-1).play();
        // PROBLEM : 음악을 실행시키니, 타이머가 빠르게 작동함 (정확히는 여러개의 타이머가 작동함)
        // SOLVE : 화면이 다시 랜더링되니, 여러개의 타이머가 작동하는 듯
    } else {
        console.log('background sound off..');
        BackgroundTimer.stopBackgroundTimer();
        soundRef.current.stop();
    }
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

interface TimeType {
    isSetTimer: any
    dispatch: any
    setModalVisible: any
    timer: any
}

const Buttons = ({isSetTimer, dispatch, setIsSetTimer, onPlay, setPlay}: ButtonsType) => {
    return (
        <ButtonContainer style={{opacity: isSetTimer ? 100 : 0}}>
            <TextCircleButton label='취소' onPress={() => {
                MyAlert(dispatch, setIsSetTimer, setPlay)
                }}/>
            <Spacer/>
            <PlayButton onPlay={onPlay} playable={isSetTimer} onPress={() => {setPlay(!onPlay)}}/>
        </ButtonContainer>
    )
}

interface ButtonsType {
    isSetTimer: any
    dispatch: any
    setIsSetTimer: any
    onPlay: any,
    setPlay: any
}

export const AlarmTitle = () => {
    return (
        <AlramContainer>
            <AlramIcon source={require('../assets/images/ic_alram.png')}/>
            <SubTitle>시간을 정해주세요</SubTitle>
        </AlramContainer>
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




