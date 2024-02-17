/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import React from 'react';
import { decode } from 'base-64';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from './screens/Container';
import moment from 'moment';

export const App = () => {
  moment.updateLocale('es', {
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años',
    },
  });
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
