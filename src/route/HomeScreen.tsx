import React, { useState, useRef } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Modal, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../App';
import NapnapModal from '../components/NapanpModal';

type navProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation }: navProps) => {
    const [isModalVisible, setModalVisible] = useState(false)

    return (
        <Background>
            <SubTitle>시간을 정해주세요</SubTitle>
            <Clickable onPress={() => {setModalVisible(true)}}>
                <TimeTitle>00:00</TimeTitle>
            </Clickable>
            
            <NapnapModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
            
        </Background>
    )
}

const Background = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${colors.background_gray_900};
`

const SubTitle = styled.Text`
    font-size: 20px;
    margin-top: 70px;
    color: ${colors.text_gray_100};
`

const Clickable = styled.TouchableOpacity`
    
`

const TimeTitle = styled.Text`
    font-size: 80px;
    color: ${colors.text_gray_100};
`

export default HomeScreen;