import { CircleButton, Clickable } from "../../utils/UtilFunctions";
import ImagePaths from "../images/ImagePaths";

interface ReloadButtonType {
    onPress: () => void
}

const ReloadButton = ({onPress}: ReloadButtonType) => {
    return (
        <Clickable onPress={onPress}>
            <CircleButton source={ImagePaths.ReloadButton}/>
        </Clickable>
    );
}

export default ReloadButton;
