import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Route, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Order } from '../../../model/order.model';
import { AntDesign } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { useState } from 'react';
import { OrderStatusBar } from '../order-status/OrderStatusBar';
import { ItemListCashier } from '../../../components/orders/order-items-list/ItemListCashier';

interface OrderDetailsCashierProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDetailsCashier = (props: OrderDetailsCashierProps) => {
  const { order } = props.route.params as { order: Order };

  const [isLoading, setIsLoading] = useState(false);

  const onPayOrderPress = async () => {
    setIsLoading(true);
    const orderRef = doc(firestore, 'orders', order.id);
    await updateDoc(orderRef, {
      status: 'completado',
    }).then(() => {
      props.navigation.goBack();
      const tableRef = doc(firestore, 'tables', order.table.id);
      updateDoc(tableRef, {
        isAvailable: true,
      });
      setIsLoading(false);
    });
  };

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
            {order.table.name}
          </Text>
          <View style={{ position: 'absolute', top: -30, right: -30 }}>
            <Image
              source={require('../../../../../assets/araña_cortada_titulo.png')}
              style={{ width: 175, height: 190 }}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 20,
          }}
        >
          <OrderStatusBar status={order.status} />
          <View>
            {order.dishes && order.dishes.length > 0 && (
              <ItemListCashier items={order.dishes} title="Platos" />
            )}
            {order.drinks && order.drinks.length > 0 && (
              <ItemListCashier items={order.drinks} title="Bebidas" />
            )}
            {order.additional && order.additional.length > 0 && (
              <ItemListCashier items={order.additional} title="Adicionales" />
            )}
          </View>
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
                alignSelf: 'center',
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#621708',
                fontSize: 16,
                alignSelf: 'center',
              }}
            >
              {order.total.toFixed(2)}
            </Text>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={onPayOrderPress}
        disabled={isLoading}
        style={{
          backgroundColor: '#941B0C',
          paddingVertical: 5,
          paddingHorizontal: 15,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          height: 60,
          alignSelf: 'center',
          justifyContent: 'center',
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          Pagar
        </Text>
      </TouchableOpacity>
    </>
  );
};
