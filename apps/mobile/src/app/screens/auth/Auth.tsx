import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import RecoverPassword from './recover-password/RecoverPassword';
import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import EmailConfirmation from './email-confirmation/EmailConfirmation';

/* eslint-disable-next-line */
export interface AuthProps {}

export function Auth(props: AuthProps) {
  const user = useRecoilValue(userState);

  const Stack = createStackNavigator();

  useEffect(() => {
    console.log(user);
  }, []);
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
}

export default Auth;
