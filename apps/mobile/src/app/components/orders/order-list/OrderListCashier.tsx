import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { userState } from '../../../storage/user/user.atom';
import { View, ScrollView, Text } from 'react-native';
import { OrderCardCashier } from '../order-cards/OrderCardCashier';
import { OrderListSkeleton } from './OrderListSkeleton';

interface OrderListCashierProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderListCashier = (props: OrderListCashierProps) => {
  const userData = useRecoilValue(userState);
  const isOrderListFocused = useIsFocused();
  const [orders, setOrders] = useState<Order[]>();

  const adminId = userData?.userId;
  const orderRef = collection(firestore, 'orders');
  const q = query(
    orderRef,
    where('status', '==', 'servido'),
    where('adminId', '==', adminId)
  );

  useEffect(() => {
    if (isOrderListFocused) {
      const unsubcribe = onSnapshot(q, (orderSnapshot) => {
        const orders = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orders as Order[]);
      });
      return () => unsubcribe();
    }
  }, [isOrderListFocused]);
  return orders ? (
    <View>
      {orders.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 60,
            marginBottom: 30,
            borderRadius: 20,
          }}
        >
          {orders
            .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
            .map((order) => (
              <OrderCardCashier
                key={order.id}
                order={order}
                navigation={props.navigation}
              />
            ))}
        </ScrollView>
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            No hay ordenes servidas
          </Text>
        </View>
      )}
    </View>
  ) : (
    <OrderListSkeleton />
  );
};
