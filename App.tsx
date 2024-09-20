import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import HomeScreen from './src/route/HomeScreen';
import FinishScreen from './src/route/FinishScreen';
import RootStackParamList from './src/navigation/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            ...TransitionPresets.FadeFromBottomAndroid,
            header: ()=>{return null}
          }}
          >
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Finish" component={FinishScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
