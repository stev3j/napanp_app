import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
