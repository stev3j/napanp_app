import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/native"
import colors from "../styles/colors"
import NapnapModal from "../components/NapanpModal"
import {
	Background,
	ButtonContainer,
	Clickable,
	MyAlert,
	Spacer,
	foramtTime,
} from "../utils/UtilFunctions"
import MusicContainer from "../components/MusicContainer"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import {
	minusMinute,
	minusSecond,
	setSecond,
	setTimer,
} from "../redux/slices/timer"
import BackgroundTimer from "react-native-background-timer"
import TextCircleButton from "../assets/buttons/TextCircleButton"
import Sound from "react-native-sound"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import RootStackParamList from "../navigation/RootStackParamList"
import ImagePaths from "../assets/images/ImagePaths"
import PlayButton from "../assets/buttons/PlayButton"
import LottieView from "lottie-react-native"
import AnimationPaths from "../assets/animatinos/AnimationPaths"
import { LogBox, Platform, View } from "react-native"
import AudioPaths from "../assets/audios/AudioPaths"

const HomeScreen = () => {
	LogBox.ignoreLogs([
		"`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
		"`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
	])

	// states
	const [isModalVisible, setModalVisible] = useState(false)
	const [onPlay, setPlay] = useState(false)
	const [isSetTimer, setIsSetTimer] = useState(false)
	const [endTime, setEndTime] = useState("시간을 정해주세요")

	// navigation
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

	/** ---------------------------- SOUND ---------------------------- */

	const [soundReady, setSoundReady] = useState(false)
	const rainSound = useRef<Sound | null>(null)

    // Rain Sound 초기화
	useEffect(() => {
        console.log("Rain Sound 초기화")

		const sound = new Sound(AudioPaths.rain, Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.error("error", error)
				return
			}
			// 사운드 파일이 로드된 후
			setSoundReady(true) // 사운드가 준비된 상태임을 알림
		})

		rainSound.current = sound

		return () => {
			if (rainSound.current) {
				rainSound.current.release() // 
			}
		}
	}, [])

	// 플레이 버튼 눌렀을 때 실행
	const handlePlaySound = () => {
		if (soundReady && rainSound.current) {
			rainSound.current.setNumberOfLoops(-1).play()
		}
	}

	// 스탑 버튼 눌렀을 때 실행
	const handleStopSound = () => {
		if (rainSound.current) {
			rainSound.current.stop(() => {
				console.log("Sound stopped.")
			})
		}
	}

	/** ---------------------------- SOUND ---------------------------- */

	/** ---------------------------- TIMER ---------------------------- */

	const timer = useAppSelector((state) => state.timer.timer)
	const dispatch = useAppDispatch()

	const handlingTimerPlay = (onPlay: any, dispatch: any, soundRef: any) => {
		const startTimer = () => {
			BackgroundTimer.runBackgroundTimer(() => {
				dispatch(minusSecond())
			}, 1000)
		}

		if (onPlay) {
			console.log("background sound on!")
			startTimer()
			handlePlaySound()
		} else {
			console.log("background sound off..")
			BackgroundTimer.stopBackgroundTimer()
			handleStopSound()
		}
	}

	// Second가 -1이 될 때마다 실행
	useEffect(() => {
		console.log(`minute: ${+timer.minute}, second: ${+timer.second}`)

		const finishCallback = () => {
			console.log("종료!")
			BackgroundTimer.stopBackgroundTimer()
			handleStopSound()
			navigation.navigate("Finish", {
				setPlay: setPlay,
				setIsSetTimer: setIsSetTimer,
			})
			setPlay(false)
			setIsSetTimer(false)
		}
		handlingTimerStop(timer, dispatch, onPlay, finishCallback)
	}, [+timer.second])

	// while playing
	useEffect(() => {
		handlingTimerPlay(onPlay, dispatch, rainSound)
	}, [onPlay])

	/** ---------------------------- TIMER ---------------------------- */

	// endTime 설정
	useEffect(() => {
		if (isSetTimer == true) {
			const now = new Date()
			const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
			setEndTime(foramtTime(formattedTime, timer))
		} else {
			setEndTime("시간을 정해주세요")
		}
	}, [isSetTimer])

	// Views
	return (
		<Background>
			<AlarmTitle endTime={endTime} />
			<Time
				isSetTimer={isSetTimer}
				dispatch={dispatch}
				setModalVisible={setModalVisible}
				timer={timer}
			/>

			<LottieView
				style={{ marginTop: 20, width: 230, height: 230 }}
				source={AnimationPaths.SleepyCat}
				autoPlay
				loop
			/>

			<Buttons
				isSetTimer={isSetTimer}
				onPlay={onPlay}
				leftOnPress={() => {
					MyAlert(dispatch, setIsSetTimer, setPlay)
				}}
				rightOnPress={() => {
					setPlay(!onPlay)
				}}
			/>

			<MusicContainer
				style={{ marginBottom: 8 }}
				iconPath={ImagePaths.NotificationIcon}
				title="배경음악"
				selectedItem="추적추적 빗소리"
			/>
			<MusicContainer
				style={{ marginBottom: 60 }}
				iconPath={ImagePaths.MusicIcon}
				title="타이머 종료음"
				selectedItem="알람음 1"
			/>

			<NapnapModal
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
				setIsSetTimer={setIsSetTimer}
			/>
		</Background>
	)
}

export default HomeScreen

const handlingTimerStop = (
	timer: any,
	dispatch: any,
	onPlay: boolean,
	finishCallBack: () => void
) => {
	if (+timer.second == 0 || Number.isNaN(+timer.second - 1)) {
		if (+timer.minute > 0) {
			if (+timer.second == 0) {
				setTimeout(() => {
					dispatch(minusMinute())
					dispatch(setSecond({ second: "60" }))
				}, 1000)
			} else {
				dispatch(minusMinute())
				dispatch(setSecond({ second: "59" }))
			}
		} else if (onPlay) {
			finishCallBack()
		}
	}
}

const Time = ({ isSetTimer, dispatch, setModalVisible, timer }: TimeType) => {
	return (
		<Clickable
			disabled={isSetTimer ? true : false}
			onPress={() => {
				dispatch(setTimer({ minute: "00", second: "00" }))
				setModalVisible(true)
			}}
		>
			<TimeTitle>{timer.minute + ":" + timer.second}</TimeTitle>
		</Clickable>
	)
}

interface TimeType {
	isSetTimer: any
	dispatch: any
	setModalVisible: any
	timer: any
}


interface ButtonsType {
	isSetTimer: any
	onPlay: any
    leftOnPress: () => void
    rightOnPress: () => void
}

const Buttons = ({
	isSetTimer,
	onPlay,
    leftOnPress,
    rightOnPress,
}: ButtonsType) => {
	return (
		<ButtonContainer style={{ opacity: isSetTimer ? 100 : 0 }}>
			<TextCircleButton label="취소" onPress={leftOnPress} />
			<Spacer />
			<PlayButton
				onPlay={onPlay}
				playable={isSetTimer}
				onPress={rightOnPress}
			/>
		</ButtonContainer>
	)
}


interface AlarmTitleProps {
	endTime: string
}

const AlarmTitle = ({ endTime }: AlarmTitleProps) => {
	return (
		<AlramContainer>
			<AlramIcon source={require("../assets/images/ic_alram.png")} />
			<SubTitle>{endTime}</SubTitle>
		</AlramContainer>
	)
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

const SubTitle = styled.Text`
	font-size: 20px;
	color: ${colors.text_gray_100};
`

const TimeTitle = styled.Text`
	font-size: 80px;
	color: ${colors.text_gray_100};
`
