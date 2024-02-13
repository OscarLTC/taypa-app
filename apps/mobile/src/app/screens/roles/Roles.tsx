import { createStackNavigator } from '@react-navigation/stack';
import RolesListScreen from './roles-list/RolesListScreen';
import { RolesWorkerListScreen } from './roles-worker-list/RolesWorkerListScreen';
import { TablesWaiters } from './roles-tables/TablesWaiter';

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
        name="roles-tables-waiter"
        options={{ headerShown: false }}
        component={TablesWaiters}
      />
    </Stack.Navigator>
  );
};
