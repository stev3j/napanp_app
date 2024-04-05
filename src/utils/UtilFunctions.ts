import styled from "styled-components/native";
import colors from "../styles/colors";
import Sound from "react-native-sound";
import AudioPaths from "../assets/audios/AudioPaths";
import { Alert } from "react-native";
import { resetTimer } from "../redux/slices/timer";

export const Spacer = styled.View`
    flex: 1;
`

export const PaddingHorizontal40 = styled.View`
    padding-left: 40px;
    padding-right: 40px;
`

export const Clickable = styled.TouchableOpacity`
`

export const Background = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${colors.background_gray_900};
`


/** -------------------------- */

export const ButtonContainer = styled.View`
    flex: 1;
    margin-top: 70px;
    flex-direction: row;
    margin-left: 55px;
    margin-right: 55px;
`

export const CircleButton = styled.Image`
    width: 60px;
    height: 60px;
`

export const MyAlert = (dispatch: any, setIsSetTimer: any, setPlay: any) => {
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