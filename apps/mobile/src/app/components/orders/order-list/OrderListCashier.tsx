import { useIsFocused } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { userState } from '../../../storage/user/user.atom';
import { View, ScrollView, Text } from 'react-native';
import { OrderCard } from '../OrderCard';

export const OrderListCashier = () => {
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
              <OrderCard key={order.id} order={order} />
            ))}
        </ScrollView>
      ) : (
        <View>
          <Text>No hay Ordenes</Text>
        </View>
      )}
    </View>
  ) : (
    <View>
      <Text>Skeleton</Text>
    </View>
  );
};
