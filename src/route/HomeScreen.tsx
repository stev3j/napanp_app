import React, { useState, useRef } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { Modal, View, Text, TouchableOpacity, SafeAreaView, Image, Button } from 'react-native';
import { RootStackParamList } from '../../App';
import NapnapModal from '../components/NapanpModal';
import { Spacer } from '../utils/UtilFunctions';
import MusicContainer from '../components/MusicContainer';

type navProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation }: navProps) => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [minute, setMinute] = useState('00')
    const [second, setSecond] = useState('00')

    return (
        <Background>
            <SubTitle>시간을 정해주세요</SubTitle>
            <Clickable onPress={() => {setModalVisible(true)}}>
                <TimeTitle>{minute+':'+second}</TimeTitle>
            </Clickable>

            <CatImage source={require('../assets/images/cat.png')}/>
            
        
            <ButtonContainer>
                <Clickable>
                    <CircleButton source={require('../assets/images/btn_start.png')}/>
                </Clickable>
                <Spacer/>
                <Clickable>
                    <CircleButton source={require('../assets/images/btn_start.png')}/>
                </Clickable>
            </ButtonContainer>
            
            <MusicContainer
                iconPath={require('../assets/images/ic_music.png')}
                title='배경음악' 
                selectedItem='추적추적 빗소리'/>
            <View style={{height: 8}}/>
            <MusicContainer
                iconPath={require('../assets/images/ic_notification.png')}
                title='타이머 종료음' 
                selectedItem='알람음 1'/>

            <View style={{height: 60}}/>

            <NapnapModal 
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                setMinute={setMinute}
                setSecond={setSecond}
            />
            
        </Background>
    )
}

const CatImage = styled.Image`
    margin-top: 20px;
    width: 240px;
    height: 220px;
`
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

const CircleButton = styled.Image`
    width: 60px;
    height: 60px;
`

const ButtonContainer = styled.View`
    flex: 1;
    margin-top: 70px;
    flex-direction: row;
    margin-left: 55px;
    margin-right: 55px;
`

export default HomeScreen;