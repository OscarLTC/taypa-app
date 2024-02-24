import { createStackNavigator } from '@react-navigation/stack';
import { SalesHistory } from './order-history/SalesHistory';

export const Sales = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="sales-history">
      <Stack.Screen
        name="sales-history"
        options={{ headerShown: false, animationEnabled: false }}
        component={SalesHistory}
      />
    </Stack.Navigator>
  );
};
