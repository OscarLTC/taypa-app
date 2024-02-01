import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DishList from './dish-list/DishList';
import DishApp from './dish-add/DishAdd';
import DishDetails from './dish-details/DishDetails';

/* eslint-disable-next-line */
export interface DishesProps {}

export function Dishes(props: DishesProps) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="dish-details">
      <Stack.Screen
        name="dish-list"
        options={{ headerShown: false }}
        component={DishList}
      />
      <Stack.Screen
        name="dish-form"
        options={{ headerShown: false }}
        component={DishApp}
      />
      <Stack.Screen
        name="dish-details"
        options={{ headerShown: false }}
        component={DishDetails}
      />
    </Stack.Navigator>
  );
}

export default Dishes;
