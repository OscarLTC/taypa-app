/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen';
import Workers from './screens/workers/Workers';
import Dishes from './screens/dishes/Dishes';
import Auth from './screens/auth/Auth';
import { RecoilRoot } from 'recoil';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';
import { Text, View } from 'react-native';

export const App = () => {
  const Stack = createStackNavigator();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIfUserIsLoggedIn = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Replace with your loading component
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isUserLoggedIn ? 'home' : 'auth'}>
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
