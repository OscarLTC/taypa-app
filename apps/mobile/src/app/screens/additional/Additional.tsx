import { createStackNavigator } from '@react-navigation/stack';
import { AdditionalListScreen } from './additional-list/AdditionalListScreen';
import { AdditionalAdd } from './additional-add/AdditionalAdd';
import { AdditionalEdit } from './additional-edit/AdditionalEdit';
import { AdditionalDetails } from './additional-details/AdditionalDetails';

export const Additional = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="drink-list">
      <Stack.Screen
        name="additional-list"
        options={{ headerShown: false }}
        component={AdditionalListScreen}
      />
      <Stack.Screen
        name="additional-add"
        options={{ headerShown: false }}
        component={AdditionalAdd}
      />
      <Stack.Screen
        name="additional-edit"
        options={{ headerShown: false }}
        component={AdditionalEdit}
      />
      <Stack.Screen
        name="additional-details"
        options={{ headerShown: false }}
        component={AdditionalDetails}
      />
    </Stack.Navigator>
  );
};
