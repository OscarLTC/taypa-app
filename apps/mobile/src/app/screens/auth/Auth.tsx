import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import RecoverPassword from './recover-password/RecoverPassword';

/* eslint-disable-next-line */
export interface AuthProps {}

export function Auth(props: AuthProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="sign-in">
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false }}
        component={SignIn}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false }}
        component={SignUp}
      />
      <Stack.Screen
        name="recover-password"
        options={{ headerShown: false }}
        component={RecoverPassword}
      />
      <Stack.Screen
        name="email-confirmation"
        options={{ headerShown: false }}
        component={RecoverPassword}
      />
    </Stack.Navigator>
  );
}

export default Auth;
