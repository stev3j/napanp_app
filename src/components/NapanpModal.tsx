import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Spacer } from '../utils/UtilFunctions';
import TimePicker from './TimePicker';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setTimer } from '../redux/slices/timer';


type NapnapModalType = {
    isModalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsSetTimer: React.Dispatch<React.SetStateAction<boolean>>
}

const NapnapModal = ({isModalVisible, setModalVisible, setIsSetTimer}: NapnapModalType) => {
    const timer = useAppSelector(state => state.timer.timer);
    const dispatch = useAppDispatch()
    const [ isZero, setIsZero ] = useState(true)

    useEffect(() => {
        if (+timer.minute > 0 || +timer.second > 0) setIsZero(false)
        else setIsZero(true)
    })

    const SetText = styled.Text`
        margin-top: 20px;
        margin-right: 20px;
        font-size: 18px;
        color: ${isZero ? colors.primary_disabled : colors.primary};
    `

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            >
            <WholeScreen>
                <ModalContainer>
                    <TextContainer>
                        <TouchableOpacity onPress={() => {
                            /** TODO: 이거 맞나? */
                            dispatch(setTimer({minute: '00', second: '00'}))
                            setModalVisible(false)
                        }}>
                            <CloseText>닫기</CloseText>
                        </TouchableOpacity>
                        <Spacer/>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                            setIsSetTimer(true)
                        }}
                            disabled={isZero}>
                            <SetText>설정</SetText>
                        </TouchableOpacity>
                    </TextContainer>

                    <TimePicker/>
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
    height: 35%;
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



export default NapnapModal;