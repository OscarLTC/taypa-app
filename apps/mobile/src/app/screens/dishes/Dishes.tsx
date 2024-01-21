import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DishList from './dish-list/DishList';
import DishForm from './dish-form/DishForm';

/* eslint-disable-next-line */
export interface DishesProps {}

export function Dishes(props: DishesProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="dish-list">
      <Stack.Screen
        name="dish-list"
        options={{ headerShown: false }}
        component={DishList}
      />
      <Stack.Screen
        name="dish-form"
        options={{ headerShown: false }}
        component={DishForm}
      />
    </Stack.Navigator>
  );
}

export default Dishes;
