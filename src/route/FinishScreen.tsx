import { useNavigation } from "@react-navigation/native";
import { Background, ButtonContainer, Spacer } from "../utils/UtilFunctions";
import { AlarmTitle } from "./HomeScreen";
import RootStackParamList from "../navigation/RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack'
import styled from "styled-components/native";
import colors from "../styles/colors";
import ImagePaths from "../assets/images/ImagePaths";
import TerminateButton from "../assets/buttons/TerminateButton";
import ReloadButton from "../assets/buttons/ReloadButton";
import { Button } from "react-native";

const FinishScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <Background>
            <AlarmTitle/>
            <Title>일어나요!</Title>
            <CatImage source={ImagePaths.WakeupCat}/>
            <Buttons navigation={navigation}/>
        </Background>
    );
}

export default FinishScreen;

const Title = styled.Text`
    font-size: 80px;
    color: ${colors.text_gray_100};
`

const CatImage = styled.Image`
    margin-top: 20px;
    width: 240px;
    height: 220px;
`

const Buttons = ({navigation}: ButtonsType) => {
    return (
        <ButtonContainer>
            <ButtonLabelContainer>
                <TerminateButton onPress={() => {navigation.goBack()}}/>
                <ButtonLabel>종료하기</ButtonLabel>
            </ButtonLabelContainer>
            
            <Spacer/>

            <ButtonLabelContainer>
                <ReloadButton onPress={() => {}}/>
                <ButtonLabel>5분 더</ButtonLabel>
            </ButtonLabelContainer>
            
        </ButtonContainer>
    )
}

const ButtonLabelContainer = styled.View`
    align-items: center;
    gap: 10px;
`

const ButtonLabel = styled.Text`
    font-size: 16px;
    color: ${colors.text_gray_100};
`

interface ButtonsType {
    navigation: any
}