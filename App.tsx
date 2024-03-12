import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from './src/route/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  TimeModal: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName="Home"
        screenOptions={{header: ()=>{return null}}}
        >
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen}/>
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
