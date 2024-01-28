/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen';
import Workers from './screens/workers/Workers';
import Dishes from './screens/dishes/Dishes';
import Auth from './screens/auth/Auth';
import { RecoilRoot } from 'recoil';
import React from 'react';

export const App = () => {
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="auth">
          <Stack.Screen
            name="auth"
            options={{ headerShown: false }}
            component={Auth}
          />
          <Stack.Screen
            name="home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="workers"
            options={{ headerShown: false }}
            component={Workers}
          />
          <Stack.Screen
            name="dishes"
            options={{ headerShown: false }}
            component={Dishes}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
