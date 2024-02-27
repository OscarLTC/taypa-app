import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DishAdd from './dish-add/DishAddScreen';
import { DishEdit } from './dish-edit/DishEdit';
import { DishListScreen } from './dish-list/DishListScreen';

export const Dishes = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="dish-list">
      <Stack.Screen
        name="dish-list"
        options={{ headerShown: false }}
        component={DishListScreen}
      />
      <Stack.Screen
        name="dish-add"
        options={{ headerShown: false }}
        component={DishAdd}
      />
      <Stack.Screen
        name="drink-edit"
        options={{ headerShown: false }}
        component={DishEdit}
      />
    </Stack.Navigator>
  );
};

export default Dishes;
