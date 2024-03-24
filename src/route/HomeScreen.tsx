import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Modal, View, Text, TouchableOpacity, SafeAreaView, Image, Button } from 'react-native';
import { RootStackParamList } from '../../App';
import NapnapModal from '../components/NapanpModal';
import { Clickable, Spacer } from '../utils/UtilFunctions';
import MusicContainer from '../components/MusicContainer';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { minusMinute, minusSecond, resetTimer, setMinute, setSecond, setTimer } from '../redux/slices/timer';
import BackgroundTimer from 'react-native-background-timer';
import TextCircleButton from '../components/TextCircleButton';

const HomeScreen = () => {
    const timer = useAppSelector(state => state.timer.timer);
    const dispatch = useAppDispatch()
    
    const [ isModalVisible, setModalVisible ] = useState(false)
    const [ onPlay, setPlay ] = useState(false)
    const [ isSetTimer, setIsSetTimer ] = useState(false)

    /** stop */
    useEffect(() => {
        console.log(`minute: ${+timer.minute}, second: ${+timer.second}`);
        
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
                
            } else {
                 BackgroundTimer.stopBackgroundTimer()
                // TODO : 타이머 종료음 울리기
                setPlay(false)
                setIsSetTimer(false)
            }
        }
    }, [+timer.second])

    /** playing */ 
    useEffect(() => {
        if (onPlay) {
            startTimer();
            // TODO : 백그라운드 음악 재생시키기
        }
        else BackgroundTimer.stopBackgroundTimer();
        return () => {
            BackgroundTimer.stopBackgroundTimer();
        }
    }, [onPlay])

    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            dispatch(minusSecond())
        }, 1000)
    }

    return (
        <Background>
            <AlramContainer>
                <AlramIcon source={require('../assets/images/ic_alram.png')}/>
                <SubTitle>시간을 정해주세요</SubTitle>
            </AlramContainer>
            
            <Clickable onPress={() => {
                dispatch(setTimer({minute: '00', second: '00'}))
                setModalVisible(true)
                }}>
                <TimeTitle>{timer.minute+':'+timer.second}</TimeTitle>
            </Clickable>

            <CatImage source={require('../assets/images/cat.png')}/>
            
            
            <ButtonContainer style={{opacity: isSetTimer ? 100 : 0}}>
                <TextCircleButton label='취소' onPress={() => {
                    dispatch(resetTimer())
                    setIsSetTimer(false)
                    }}/>
                <Spacer/>
                <PlayButton onPlay={onPlay} setPlay={setPlay} playable={isSetTimer}/>
            </ButtonContainer>
            
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

type PlayButtonType = {
    onPlay: boolean,
    setPlay: any,
    playable: boolean,
}

const PlayButton = ({onPlay, setPlay, playable}: PlayButtonType) => {
    return (
        <Clickable onPress={() => {
            setPlay(!onPlay)
            }}
            disabled={playable ? false : true}>
            <CircleButton source={
                onPlay ? require('../assets/images/btn_pause_re.png') 
                : require('../assets/images/btn_start.png')
                }/>
        </Clickable>
    );
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
const Background = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${colors.background_gray_900};
`

const SubTitle = styled.Text`
    font-size: 20px;
    color: ${colors.text_gray_100};
`

const TimeTitle = styled.Text`
    font-size: 80px;
    color: ${colors.text_gray_100};
`

const CircleButton = styled.Image`
    width: 60px;
    height: 60px;
`

const ButtonContainer = styled.View`
    flex: 1;
    margin-top: 70px;
    flex-direction: row;
    margin-left: 55px;
    margin-right: 55px;
`

export default HomeScreen;