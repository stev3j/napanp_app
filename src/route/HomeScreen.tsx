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
import LottieView from 'lottie-react-native';
import AnimationPaths from '../assets/animatinos/AnimationPaths';

const HomeScreen = () => {
    // navigation
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // timer
    const timer = useAppSelector(state => state.timer.timer);
    const dispatch = useAppDispatch()
    
    // states
    const [ isModalVisible, setModalVisible ] = useState(false)
    const [ onPlay, setPlay ] = useState(false)
    const [ isSetTimer, setIsSetTimer ] = useState(false) 
    const [ endTime, setEndTime ] = useState('시간을 정해주세요')

    // sound
    const rainSound = useRef<Sound>(
        new Sound('rain.wav', Sound.MAIN_BUNDLE, error => {
            if (error) {
                console.error("error", error);
            }
        })
    );

    // endTime 설정
    useEffect(() => {
        if (isSetTimer == true) {
            const now = new Date();
            const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            setEndTime(foramtTime(formattedTime, timer))
        } else {
            setEndTime('시간을 정해주세요')
        }
    }, [isSetTimer])

    // timer count (second가 줄어들 때마다)
    useEffect(() => {
        console.log(`minute: ${+timer.minute}, second: ${+timer.second}`);
        handlingTimerStop(timer, dispatch, onPlay, setPlay, setIsSetTimer, navigation, rainSound)
    }, [+timer.second])

    // while playing
    useEffect(() => {
        handlingTimerStart(onPlay, dispatch, rainSound)
    }, [onPlay])

    // Views
    return (
        <Background>
            <AlarmTitle endTime={endTime}/>
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

interface Timer {
    minute: string;
    second: string;
}

// 받아온 시간 포맷하기 (ex. 11:11:30)
const foramtTime = (time: string, timer: Timer): string => {
    const array = time.split(':')
    let hour = +array[0]
    let minute = +array[1]
    let second = +array[2]

    second = second + (+timer.second)

    if (second > 59) { minute = minute + 1 }

    minute = minute + (+timer.minute)

    if (minute > 59) {
        hour = hour + 1
        minute = minute - 60
    }

    if (hour < 12) {
        const result = `오전 ${hour}시 ${minute}분`
        return result
    } else {
        const result = `오후 ${hour}시 ${minute}분`
        return result
    }
}

const handlingTimerStop = (timer: any, dispatch: any, onPlay: boolean, setPlay: any, setIsSetTimer: any, navigation: any, soundRef: any) => {
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
            soundRef.current.stop();
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

interface AlarmTitleProps {
    endTime: string
}

const AlarmTitle = ({endTime}: AlarmTitleProps) => {
    return (
        <AlramContainer>
            <AlramIcon source={require('../assets/images/ic_alram.png')}/>
            <SubTitle>{endTime}</SubTitle> 
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




