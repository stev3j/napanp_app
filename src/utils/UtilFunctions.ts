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