import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DishList from './dish-list/DishList';

/* eslint-disable-next-line */
export interface DishesProps {}

export function Dishes(props: DishesProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        options={{ headerShown: false }}
        component={DishList}
      />
    </Stack.Navigator>
  );
}

export default Dishes;
