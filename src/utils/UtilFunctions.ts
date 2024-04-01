import styled from "styled-components/native";
import colors from "../styles/colors";

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