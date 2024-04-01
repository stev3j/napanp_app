import styled from "styled-components/native";
import colors from "../../styles/colors";
import { Clickable } from "../../utils/UtilFunctions";

interface TextCircleButtonType {
    label: string
    onPress: () => void
}

const TextCircleButton = ({label, onPress}: TextCircleButtonType) => {
    return (
        <Clickable onPress={onPress}>
            <Frame>
                <Label>{label}</Label>
            </Frame>
        </Clickable>
        
    );
}

export default TextCircleButton;

const Frame = styled.View`
    border-radius: 100px;
    width: 60px;
    height: 60px;
    background-color: ${colors.container_gray_700};
    align-items: center;
    justify-content: center;
`

const Label = styled.Text`
    font-size: 14px;
    color: ${colors.white};
`