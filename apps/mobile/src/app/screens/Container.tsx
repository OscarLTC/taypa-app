import React, { useEffect } from 'react';
import Auth from './auth/Auth';
import Dishes from './dishes/Dishes';
import HomeScreen from './home/HomeScreen';
import Workers from './workers/Workers';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { isUserSignedInSelector } from '../storage/user/user.selector';
import Tables from './tables/Tables';
import { Roles } from './roles/Roles';
import { StatusBar } from 'react-native';
import { Orders } from './orders/Order';
import { Drinks } from './drinks/Drinks';

interface ContainerProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Container = (props: ContainerProps) => {
  const Stack = createStackNavigator();
  const userSelector = useRecoilValue(isUserSignedInSelector);

  useEffect(() => {
    StatusBar.setHidden(true);

    if (userSelector.isUserLocked) {
      props.navigation.navigate('roles');
    } else if (userSelector.isUserSignedIn) {
      props.navigation.navigate('home');
    }
    return () => {
      StatusBar.setHidden(false);
    };
  }, [userSelector]);

  return (
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
        name="tables"
        options={{ headerShown: false }}
        component={Tables}
      />
      <Stack.Screen
        name="dishes"
        options={{ headerShown: false }}
        component={Dishes}
      />
      <Stack.Screen
        name="drinks"
        options={{ headerShown: false }}
        component={Drinks}
      />
      <Stack.Screen
        name="orders"
        options={{ headerShown: false }}
        component={Orders}
      />
      <Stack.Screen
        name="roles"
        options={{ headerShown: false }}
        component={Roles}
      />
    </Stack.Navigator>
  );
};
