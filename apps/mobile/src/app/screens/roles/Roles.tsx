import { createStackNavigator } from '@react-navigation/stack';
import RolesListScreen from './roles-list/RolesListScreen';
import { RolesWorkerListScreen } from './roles-worker-list/RolesWorkerListScreen';
import { RolesTables } from './roles-tables/RolesTables';

export const Roles = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="roles-list"
        options={{ headerShown: false }}
        component={RolesListScreen}
      />
      <Stack.Screen
        name="roles-worker-list"
        options={{ headerShown: false }}
        component={RolesWorkerListScreen}
      />
      <Stack.Screen
        name="roles-tables"
        options={{ headerShown: false }}
        component={RolesTables}
      />
    </Stack.Navigator>
  );
};
