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
import { Additional } from './additional/Additional';
import { Notifications } from '../components/notifications/Notifications';
import { Sales } from './sales/Sales';
import { SplashScreen } from './splash/SplashScreen';

interface ContainerProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Container = (props: ContainerProps) => {
  const Stack = createStackNavigator();
  const userSelector = useRecoilValue(isUserSignedInSelector);

  useEffect(() => {
    StatusBar.setHidden(true);

    setTimeout(() => {
      if (userSelector.isUserLocked) {
        props.navigation.navigate('roles');
      } else if (userSelector.isUserSignedIn) {
        props.navigation.navigate('home');
      } else {
        props.navigation.navigate('auth');
      }
    }, 1500);
    return () => {
      StatusBar.setHidden(false);
    };
  }, [userSelector]);

  return (
    <>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          options={{ headerShown: false, animationEnabled: false }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="auth"
          options={{ headerShown: false, animationEnabled: false }}
          component={Auth}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false, animationEnabled: false }}
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
          name="additional"
          options={{ headerShown: false }}
          component={Additional}
        />
        <Stack.Screen
          name="orders"
          options={{ headerShown: false }}
          component={Orders}
        />
        <Stack.Screen
          name="roles"
          options={{ headerShown: false, animationEnabled: false }}
          component={Roles}
        />
        <Stack.Screen
          name="sales"
          options={{ headerShown: false, animationEnabled: false }}
          component={Sales}
        />
      </Stack.Navigator>
      <Notifications />
    </>
  );
};
