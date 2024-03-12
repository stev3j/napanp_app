import { Modal, TouchableOpacity, } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Spacer } from '../utils/UtilFunctions';

type NapnapModalType = {
    isModalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const NapnapModal = (props: NapnapModalType) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isModalVisible}
            >
            <WholeScreen>
                <ModalContainer>
                    <TextContainer>
                        <TouchableOpacity onPress={() => {props.setModalVisible(false)}}>
                            <CloseText>닫기</CloseText>
                        </TouchableOpacity>
                        <Spacer/>
                        <TouchableOpacity onPress={() => {props.setModalVisible(false)}}>
                            <SetText>설정</SetText>
                        </TouchableOpacity>
                    </TextContainer>
                </ModalContainer>
            </WholeScreen>
        </Modal>
    );
}

const WholeScreen = styled.View`
    flex: 1;
    justify-content: flex-end;
`

const ModalContainer = styled.View`
    background-color: ${colors.container_gray_700};
    height: 30%;
    border-radius: 10px;
`

const TextContainer = styled.View`
    flex-direction: row;
`

const CloseText = styled.Text`
    margin-top: 20px;
    margin-left: 20px;
    font-size: 18px;
    color: ${colors.text_gray_100};
`

const SetText = styled.Text`
    margin-top: 20px;
    margin-right: 20px;
    font-size: 18px;
    color: ${colors.primary};
`

export default NapnapModal;