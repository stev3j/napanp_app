import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Background, ButtonContainer, Spacer } from "../utils/UtilFunctions"
import RootStackParamList from "../navigation/RootStackParamList"
import { StackNavigationProp } from "@react-navigation/stack"
import styled from "styled-components/native"
import colors from "../styles/colors"
import ImagePaths from "../assets/images/ImagePaths"
import TerminateButton from "../assets/buttons/TerminateButton"
import ReloadButton from "../assets/buttons/ReloadButton"
import { Button, LogBox } from "react-native"
import Sound from "react-native-sound"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../redux/hook"
import { setTimer } from "../redux/slices/timer"
import AudioPaths from "../assets/audios/AudioPaths"

const FinishScreen = ({ route }: any) => {
	LogBox.ignoreLogs([
		"Non-serializable values were found in the navigation state.",
	])

	const { setPlay, setIsSetTimer } = route.params

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

	/** ---------------------------- SOUND ---------------------------- */

	const [soundReady, setSoundReady] = useState(false)
	const alarmSound = useRef<Sound | null>(null)

	useEffect(() => {
		console.log("Alarm Sound 초기화")

		const sound = new Sound(
			AudioPaths.alarm,
			Sound.MAIN_BUNDLE,
			(error) => {
				if (error) {
					console.error("error", error)
					return
				}
				// 사운드 파일이 로드된 후
				setSoundReady(true) // 사운드가 준비된 상태임을 알림
			}
		)

		alarmSound.current = sound

		return () => {
			if (alarmSound.current) {
				alarmSound.current.release() //
			}
		}
	}, [])

	// 플레이 버튼 눌렀을 때 실행
	const handlePlaySound = () => {
		if (soundReady && alarmSound.current) {
			alarmSound.current.setNumberOfLoops(-1).play()
		}
	}

	// 스탑 버튼 눌렀을 때 실행
	const handleStopSound = () => {
		if (alarmSound.current) {
			alarmSound.current.stop(() => {
				console.log("Sound stopped.")
			})
		}
	}

	/** ---------------------------- SOUND ---------------------------- */

	useEffect(() => {
		console.log("알람이 울리고 있어요!")
		handlePlaySound()
	})

	const dispatch = useAppDispatch()

	// View
	return (
		<Background>
			<AlarmTitle />
			<Title>일어나요!</Title>
			<CatImage source={ImagePaths.WakeupCat} />
			<Buttons
				onPressStop={() => {
					handleStopSound()
					navigation.goBack()
				}}
				onPress5Minute={() => {
					handleStopSound()
					dispatch(setTimer({ minute: "05", second: "00" }))
					setIsSetTimer(true)
					setPlay(true)
					navigation.goBack()
				}}
			/>
		</Background>
	)
}

export default FinishScreen

interface ButtonsType {
	onPressStop: () => void
	onPress5Minute: () => void
}

const Buttons = ({ onPressStop, onPress5Minute }: ButtonsType) => {
	return (
		<ButtonContainer>
			<ButtonLabelContainer>
				<TerminateButton onPress={onPressStop} />

				<ButtonLabel>종료하기</ButtonLabel>
			</ButtonLabelContainer>

			<Spacer />

			<ButtonLabelContainer>
				<ReloadButton onPress={onPress5Minute} />
				<ButtonLabel>5분 더</ButtonLabel>
			</ButtonLabelContainer>
		</ButtonContainer>
	)
}

const AlarmTitle = () => {
	const now = new Date()
	const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

	return (
		<AlramContainer>
			<AlramIcon source={require("../assets/images/ic_alram.png")} />
			<SubTitle>{foramtTime(formattedTime)}</SubTitle>
		</AlramContainer>
	)
}

const foramtTime = (time: string): string => {
	const array = time.split(":")
	let hour = +array[0]
	let minute = +array[1]

	if (hour < 12) {
		const result = `오전 ${hour}시 ${minute}분`
		return result
	} else {
		const result = `오후 ${hour - 12}시 ${minute}분`
		return result
	}
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

const Title = styled.Text`
	font-size: 80px;
	color: ${colors.text_gray_100};
`

const CatImage = styled.Image`
	margin-top: 20px;
	width: 240px;
	height: 220px;
`

const ButtonLabelContainer = styled.View`
	align-items: center;
	gap: 10px;
`

const ButtonLabel = styled.Text`
	font-size: 16px;
	color: ${colors.text_gray_100};
`
