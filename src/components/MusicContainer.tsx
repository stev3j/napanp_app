import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { PaddingHorizontal40, Spacer } from '../utils/UtilFunctions';
import TimePicker from './TimePicker';


type MusicContainerType = {
    iconPath: any
    title: string
    selectedItem: string
}

const MusicContainer = (props: MusicContainerType) => {

    return (
        <PaddingHorizontal40>
            <Container>
                <Icon source={props.iconPath}/>
                <Title>{props.title}</Title>
                <Spacer/>
                <SelectedItem>{props.selectedItem}</SelectedItem>
            </Container>
        </PaddingHorizontal40>
        
    );
}

const Icon = styled.Image`
    width: 8px;
    height: 8px;
    margin-left: 14px;
`

const Container = styled.View`
    background-color: ${colors.container_gray_700};
    height: 40px;
    width: 100%;
    margin-left: 40px;
    margin-right: 40px;
    align-items: center;
    border-radius: 8px;
    flex-direction: row;
`

const Title = styled.Text`
    font-size: 14px;
    color: ${colors.text_gray_100};
    margin-left: 6px;
`

const SelectedItem = styled.Text`
    font-size: 14px;
    color: ${colors.hint_gray_200};
    margin-right: 14px;
`

export default MusicContainer;