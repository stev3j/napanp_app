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


interface Timer {
  minute: string;
  second: string;
}

// 받아온 시간 포맷하기 (ex. 11:11:30)
export const foramtTime = (time: string, timer: Timer): string => {
  const array = time.split(':');
  let hour = +array[0];
  let minute = +array[1];
  let second = +array[2];

  second = second + +timer.second;

  if (second > 59) {
    minute = minute + 1;
  }

  minute = minute + +timer.minute;

  if (minute > 59) {
    hour = hour + 1;
    minute = minute - 60;
  }

  if (hour < 12) {
    const result = `오전 ${hour}시 ${minute}분`;
    return result;
  } else {
    const result = `오후 ${hour - 12}시 ${minute}분`;
    return result;
  }
};