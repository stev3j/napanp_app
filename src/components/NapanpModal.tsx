import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Spacer } from '../utils/UtilFunctions';
import TimePicker from './TimePicker';


type NapnapModalType = {
    isModalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setMinute: any
    setSecond: any
}

const NapnapModal = (props: NapnapModalType) => {

    // useEffect(() => {
    //     props.setMinute('00')
    //     props.setSecond('00')
    // })

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isModalVisible}
            >
            <WholeScreen>
                <ModalContainer>
                    <TextContainer>
                        <TouchableOpacity onPress={() => {
                            props.setMinute('00')
                            props.setSecond('00')
                            props.setModalVisible(false)
                        }}>
                            <CloseText>닫기</CloseText>
                        </TouchableOpacity>
                        <Spacer/>
                        <TouchableOpacity onPress={() => {
                            props.setModalVisible(false)
                        }}>
                            <SetText>설정</SetText>
                        </TouchableOpacity>
                    </TextContainer>
                    {/* <TimeSelector limit = {LIMITS} defaultOffsetHour = {"12"}/> */}

                    {/** 스크롤뷰 + 멈춤 + 그림자 */}
                    <TimePicker setMinute={props.setMinute} setSecond={props.setSecond}/>
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

const SetText = styled.Text`
    margin-top: 20px;
    margin-right: 20px;
    font-size: 18px;
    color: ${colors.primary};
`

export default NapnapModal;