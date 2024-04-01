import { useNavigation } from "@react-navigation/native";
import { Background } from "../utils/UtilFunctions";
import { AlarmTitle } from "./HomeScreen";
import RootStackParamList from "../navigation/RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack'
import styled from "styled-components/native";
import colors from "../styles/colors";
import ImagePaths from "../assets/images/ImagePaths";

const FinishScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <Background>
            <AlarmTitle/>
            <Title>일어나요!</Title>
            <CatImage source={ImagePaths.WakeupCat}/>
        </Background>
    );
}

const Title = styled.Text`
    font-size: 80px;
    color: ${colors.text_gray_100};
`

const CatImage = styled.Image`
    margin-top: 20px;
    width: 240px;
    height: 220px;
`

export default FinishScreen;