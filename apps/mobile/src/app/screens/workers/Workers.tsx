import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import WorkerList from './worker-list/WorkerList';
import WorkerAdd from './worker-add/WorkerAdd';

/* eslint-disable-next-line */
export interface WorkersProps {}

export function Workers(props: WorkersProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="workers-list">
      <Stack.Screen
        name="workers-list"
        options={{ headerShown: false }}
        component={WorkerList}
      />
      <Stack.Screen
        name="worker-add"
        options={{ headerShown: false }}
        component={WorkerAdd}
      />
    </Stack.Navigator>
  );
}

export default Workers;
