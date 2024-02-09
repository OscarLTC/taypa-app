import { createStackNavigator } from '@react-navigation/stack';
import { OrderAdd } from './orders-add/OrderAdd';
import { OrderDetails } from './orders-details/OrderDetails';

export const Orders = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="order-details"
        options={{ headerShown: false }}
        component={OrderDetails}
      />
      <Stack.Screen
        name="order-add"
        options={{ headerShown: false }}
        component={OrderAdd}
      />
    </Stack.Navigator>
  );
};
