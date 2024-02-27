import { createStackNavigator } from '@react-navigation/stack';
import { DrinkListScreen } from './drink-list/DrinkListScreen';
import { DrinkAdd } from './drink-add/DrinkAddScreen';
import { DrinkEdit } from './drink-edit/DrinkEdit';

export const Drinks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="drink-list">
      <Stack.Screen
        name="drink-list"
        options={{ headerShown: false }}
        component={DrinkListScreen}
      />
      <Stack.Screen
        name="drink-add"
        options={{ headerShown: false }}
        component={DrinkAdd}
      />
      <Stack.Screen
        name="drink-edit"
        options={{ headerShown: false }}
        component={DrinkEdit}
      />
    </Stack.Navigator>
  );
};
