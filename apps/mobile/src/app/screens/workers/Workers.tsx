import { createStackNavigator } from '@react-navigation/stack';
import React, { Suspense } from 'react';

import WorkerList from './worker-list/WorkerList';
import WorkerAdd from './worker-add/WorkerAdd';
import WorkerDetails from './worker-details/WorkerDetails';
import WorkerEdit from './worker-edit/WorkerEdit';
import { View } from 'react-native';

/* eslint-disable-next-line */
export interface WorkersProps {}

export function Workers(props: WorkersProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="worker-list">
      <Stack.Screen
        name="worker-list"
        options={{ headerShown: false }}
        component={WorkerList}
      />
      <Stack.Screen
        name="worker-add"
        options={{ headerShown: false }}
        component={WorkerAdd}
      />
      <Stack.Screen
        name="worker-details"
        options={{ headerShown: false }}
        component={WorkerDetails}
      />
      <Stack.Screen
        name="worker-edit"
        options={{ headerShown: false }}
        component={WorkerEdit}
      />
    </Stack.Navigator>
  );
}

export default Workers;
