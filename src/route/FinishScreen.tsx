import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Background, ButtonContainer, Spacer } from "../utils/UtilFunctions";
import RootStackParamList from "../navigation/RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack'
import styled from "styled-components/native";
import colors from "../styles/colors";
import ImagePaths from "../assets/images/ImagePaths";
import TerminateButton from "../assets/buttons/TerminateButton";
import ReloadButton from "../assets/buttons/ReloadButton";
import { Button } from "react-native";
import Sound from "react-native-sound";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../redux/hook";
import { setTimer } from "../redux/slices/timer";
// import AudioPaths from "../assets/audios/AudioPaths";

const FinishScreen = ({ route }: any) => {
    const { setPlay, setIsSetTimer } = route.params;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Sound
    const alarmSound = useRef<Sound>(
        new Sound('alarm.wav', Sound.MAIN_BUNDLE, error => {
            if (error) {
                console.error("error", error);
            }
        })
    );

    useEffect(() => {
        setTimeout(() => {
            console.log("알람이 울리고 있어요!");
            // console.log(`Props: ${onPlay} ${isSetTimer}`);
            alarmSound.current.setNumberOfLoops(-1).play()
        }, 1500)
    })

    const dispatch = useAppDispatch()

    // View
    return (
        <Background>
            <AlarmTitle/>
            <Title>일어나요!</Title>
            <CatImage source={ImagePaths.WakeupCat}/>
            <Buttons onPressStop={() => {
                alarmSound.current.stop()
                navigation.goBack()
            }} onPress5Minute={() => {
                dispatch(setTimer({minute: '05', second: '00'}))
                setIsSetTimer(true)
                setPlay(true)
                navigation.goBack()
            }}/>
        </Background>
    );
}

export default FinishScreen;

interface ButtonsType {
    onPressStop: () => void,
    onPress5Minute: () => void
}

const Buttons = ({onPressStop, onPress5Minute}: ButtonsType) => {
    return (
        <ButtonContainer>
            <ButtonLabelContainer>
                <TerminateButton onPress={onPressStop}/>
                   
                <ButtonLabel>종료하기</ButtonLabel>
            </ButtonLabelContainer>
            
            <Spacer/>

            <ButtonLabelContainer>
                <ReloadButton onPress={onPress5Minute}/>
                <ButtonLabel>5분 더</ButtonLabel>
            </ButtonLabelContainer>
            
        </ButtonContainer>
    )
}

const AlarmTitle = () => {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    
    return (
        <AlramContainer>
            <AlramIcon source={require('../assets/images/ic_alram.png')}/>
            <SubTitle>{foramtTime(formattedTime)}</SubTitle> 
        </AlramContainer>
    );
}

const foramtTime = (time: string): string => {
    const array = time.split(':')
    let hour = +array[0]
    let minute = +array[1]

    if (hour < 12) {
        const result = `오전 ${hour}시 ${minute}분`
        return result
    } else {
        const result = `오후 ${hour-12}시 ${minute}분`
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

