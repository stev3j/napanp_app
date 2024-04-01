import { CircleButton, Clickable } from "../../utils/UtilFunctions";
import ImagePaths from "../images/ImagePaths";

interface PlayButtonType {
    onPlay: boolean
    playable: boolean
    onPress: () => void
}

const PlayButton = ({onPlay, playable, onPress}: PlayButtonType) => {
    return (
        <Clickable
            onPress={onPress}
            disabled={playable ? false : true}>
            <CircleButton source={
                onPlay ? ImagePaths.PauseButton : ImagePaths.PlayButton
                }/>
        </Clickable>
    );
}

export default PlayButton;

