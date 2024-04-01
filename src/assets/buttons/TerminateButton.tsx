import { CircleButton, Clickable } from "../../utils/UtilFunctions";
import ImagePaths from "../images/ImagePaths";

interface TerminateButtonType {
    onPress: () => void
}

const TerminateButton = ({onPress}: TerminateButtonType) => {
    return (
        <Clickable onPress={onPress}>
            <CircleButton source={ImagePaths.TerminateButton}/>
        </Clickable>
    );
}

export default TerminateButton;
