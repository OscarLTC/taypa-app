import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import WorkersList from './workers-list/WorkersList';

/* eslint-disable-next-line */
export interface WorkersProps {}

export function Workers(props: WorkersProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="workers-list">
      <Stack.Screen
        name="workers-list"
        options={{ headerShown: false }}
        component={WorkersList}
      />
    </Stack.Navigator>
  );
}

export default Workers;
