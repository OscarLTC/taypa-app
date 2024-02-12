import { createStackNavigator } from '@react-navigation/stack';
import { OrderAdd } from './orders-add/OrderAdd';
import { OrderDetails } from './orders-details/OrderDetails';
import { OrderDishes } from './order-dishes/OrderDishes';
import { OrderListScreen } from './order-list/OrderListScreen';

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
      <Stack.Screen
        name="order-list"
        options={{ headerShown: false }}
        component={OrderListScreen}
      />
      <Stack.Screen
        name="order-dish-list"
        options={{ headerShown: false }}
        component={OrderDishes}
      />
    </Stack.Navigator>
  );
};
