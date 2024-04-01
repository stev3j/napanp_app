import { useNavigation } from "@react-navigation/native";
import { Background } from "../utils/UtilFunctions";
import { AlarmTitle } from "./HomeScreen";
import RootStackParamList from "../navigation/RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack'

const FinishScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    return (
        <Background>
            <AlarmTitle/>
        </Background>
    );
}

export default FinishScreen;