import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { Table } from '../../../model/table.model';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { orderIdState } from '../../../storage/order/orderId.atom';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { useRecoilValue } from 'recoil';

interface OrderDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDetails = (props: OrderDetailsProps) => {
  const { table } = props.route.params as { table: Table };
  const [order, setOrder] = useState<Order>();
  const orderId = useRecoilValue(orderIdState);

  const getOrder = async () => {
    const orderRef = doc(firestore, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    setOrder({
      id: orderDoc.id,
      ...orderDoc.data(),
    } as Order);
  };

  useEffect(() => {
    if (orderId) {
      getOrder();
    }
  });

  return (
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
            props.navigation.navigate('order-add', {
              table: table,
            });
          }}
        >
          <AntDesign name="plus" size={25} color="white" />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          />
        </View>
      </View>
      {order ? (
        ''
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
  );
};
