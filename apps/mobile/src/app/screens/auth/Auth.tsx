import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import RecoverPassword from './recover-password/RecoverPassword';
import EmailConfirmation from './email-confirmation/EmailConfirmation';

export const Auth = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="sign-in">
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, animationEnabled: false }}
        component={SignIn}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, animationEnabled: false }}
        component={SignUp}
      />
      <Stack.Screen
        name="recover-password"
        options={{ headerShown: false, animationEnabled: false }}
        component={RecoverPassword}
      />
      <Stack.Screen
        name="email-confirmation"
        options={{ headerShown: false, animationEnabled: false }}
        component={EmailConfirmation}
      />
    </Stack.Navigator>
  );
};

export default Auth;
