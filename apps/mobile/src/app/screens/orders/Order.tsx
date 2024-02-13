import { createStackNavigator } from '@react-navigation/stack';
import { OrderAdd } from './orders-add/OrderAdd';
import { OrderDetailsWaiter } from './orders-details/OrderDetailsWaiter';
import { OrderDishes } from './order-dishes/OrderDishes';
import { OrderDetailsCook } from './orders-details/OrderDetailsCook';
import { OrderListCookScreen } from './order-list/OrderListCookScreen';
import { OrderListCashierScreen } from './order-list/OrderListCashierScreen';
import { OrderDetailsCashier } from './orders-details/OrderDetailsCashier';

export const Orders = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="order-details-waiter"
        options={{ headerShown: false }}
        component={OrderDetailsWaiter}
      />
      <Stack.Screen
        name="order-details-cook"
        options={{ headerShown: false }}
        component={OrderDetailsCook}
      />
      <Stack.Screen
        name="order-details-cashier"
        options={{ headerShown: false }}
        component={OrderDetailsCashier}
      />
      <Stack.Screen
        name="order-add"
        options={{ headerShown: false }}
        component={OrderAdd}
      />
      <Stack.Screen
        name="order-list-cook"
        options={{ headerShown: false }}
        component={OrderListCookScreen}
      />
      <Stack.Screen
        name="order-list-cashier"
        options={{ headerShown: false }}
        component={OrderListCashierScreen}
      />
      <Stack.Screen
        name="order-dish-list"
        options={{ headerShown: false }}
        component={OrderDishes}
      />
    </Stack.Navigator>
  );
};
