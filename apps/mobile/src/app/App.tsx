/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './screens/login-screen/LoginScreen';
import HomeScreen from './screens/home-screen/HomeScreen';
import { RecoilRoot } from 'recoil';
import Sessions from './screens/sessions-screen/SessionsScreen';
import RecoverScreen from './screens/recover-screen/RecoverScreen';
import EmailConfirmationScreen from './screens/email-confirmation-screen/EmailConfirmationScreen';
import RolesScreen from './screens/roles-screen/RolesScreen';
import WorkersScreen from './screens/workers-screen/WorkersScreen';
import Dishes from './screens/dishes/Dishes';
import RegisterScreen from './screens/register-screen/RegisterScreen';

export const App = () => {
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            options={{ headerShown: false, animationEnabled: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="register"
            options={{ headerShown: false, animationEnabled: false }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="recover"
            options={{ headerShown: false }}
            component={RecoverScreen}
          />
          <Stack.Screen
            name="email-confirmation"
            options={{ headerShown: false }}
            component={EmailConfirmationScreen}
          />
          <Stack.Screen
            name="home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="sessions"
            options={{ headerShown: false }}
            component={Sessions}
          />
          <Stack.Screen
            name="roles"
            options={{ headerShown: false }}
            component={RolesScreen}
          />
          <Stack.Screen
            name="workers"
            options={{ headerShown: false }}
            component={WorkersScreen}
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
