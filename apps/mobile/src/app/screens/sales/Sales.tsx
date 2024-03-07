import { createStackNavigator } from '@react-navigation/stack';
import { SalesHistory } from './sales-history/SalesHistory';
import { SaleDetails } from './sale-details/SaleDetails';

export const Sales = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="sales-history">
      <Stack.Screen
        name="sales-history"
        options={{ headerShown: false, animationEnabled: false }}
        component={SalesHistory}
      />
      <Stack.Screen
        name="sale-details"
        options={{ headerShown: false, animationEnabled: false }}
        component={SaleDetails}
      />
    </Stack.Navigator>
  );
};
