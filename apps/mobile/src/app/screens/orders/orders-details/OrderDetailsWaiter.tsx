import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { Table } from '../../../model/table.model';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { OrderStatusBar } from '../order-status/OrderStatusBar';
import { ItemListWaiter } from '../../../components/orders/order-items-list/ItemListWaiter';

interface OrderDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDetailsWaiter = (props: OrderDetailsProps) => {
  const { table } = props.route.params as { table: Table };
  const [order, setOrder] = useState<Order>();

  const getOrder = async () => {
    const orderRef = collection(firestore, 'orders');
    const q = query(
      orderRef,
      where('table.id', '==', table.id),
      where('status', 'not-in', ['completado', 'cancelado'])
    );

    const orderDoc = await getDocs(q);
    const order = orderDoc.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrder(order[0] as Order);
  };

  const onServedStatusChangePress = async () => {
    if (order?.status === 'listo') {
      const orderId = order?.id;
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'servido',
        updatedAt: new Date(),
      });
      setOrder({ ...order, status: 'listo' });
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    getOrder();
  });

  return (
    <>
      <View
        style={{
          padding: 30,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <TouchableHighlight
            underlayColor={'#F6AA1C'}
            style={{
              position: 'absolute',
              left: 0,
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#FFFFFF',
              zIndex: 1,
              flexDirection: 'row',
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            delayPressOut={100}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableHighlight>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              color: 'black',
            }}
          >
            {table.name}
          </Text>
          <TouchableHighlight
            underlayColor={'#941B0C'}
            style={{
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#E74545',
              zIndex: 1,
              flexDirection: 'row',
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            delayPressOut={100}
            onPress={() => {
              order
                ? props.navigation.navigate('order-edit', {
                    table: table,
                  })
                : props.navigation.navigate('order-add', {
                    table: table,
                  });
            }}
          >
            {order ? (
              <AntDesign name="edit" size={20} color="white" />
            ) : (
              <AntDesign name="plus" size={20} color="white" />
            )}
          </TouchableHighlight>
          <View style={{ position: 'absolute', top: -30, right: -30 }}>
            <Image
              source={require('../../../../../assets/araña_cortada_titulo.png')}
              style={{ width: 175, height: 190 }}
            />
          </View>
        </View>
        {order ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 20 }}
          >
            <OrderStatusBar status={order.status} />
            <View>
              {order.dishes && order.dishes.length > 0 && (
                <ItemListWaiter items={order.dishes} title="Platos" />
              )}
              {order.drinks && order.drinks.length > 0 && (
                <ItemListWaiter items={order.drinks} title="Bebidas" />
              )}
              {order.additional && order.additional.length > 0 && (
                <ItemListWaiter items={order.additional} title="Adicionales" />
              )}
            </View>
            {order.note && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F5F5F5',
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Nota:
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#626262',
                    fontSize: 12,
                  }}
                >
                  {order.note}
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {'Agregue una orden para\n comenzar a tomar pedidos'}
            </Text>
          </View>
        )}
      </View>
      {order?.status === 'listo' && (
        <TouchableHighlight
          underlayColor={'#F6AA1C'}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#941B0C',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          delayPressOut={100}
          onPress={onServedStatusChangePress}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            Servido
          </Text>
        </TouchableHighlight>
      )}
    </>
  );
};
