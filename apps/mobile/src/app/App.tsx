/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import React from 'react';
import { decode } from 'base-64';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from './screens/Container';

export const App = () => {
  if (typeof global.atob === 'undefined') {
    global.atob = decode;
  }
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="container"
            component={Container}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
