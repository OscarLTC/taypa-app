import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DishListScreen from './dish-list/DishListScreen';
import DishAdd from './dish-add/DishAddScreen';
import DishDetails from './dish-details/DishDetailsScreen';
import { DishEdit } from './dish-edit/DishEdit';

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
        name="dish-edit"
        options={{ headerShown: false }}
        component={DishEdit}
      />
      <Stack.Screen
        name="dish-details"
        options={{ headerShown: false }}
        component={DishDetails}
      />
    </Stack.Navigator>
  );
};

export default Dishes;
