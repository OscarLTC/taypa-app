import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Order } from '../../../model/order.model';

interface OrderCardCashierProps {
  navigation: NavigationProp<ParamListBase>;
  order: Order;
}

export const OrderCardCashier = (props: OrderCardCashierProps) => {
  const orderDishesQuantity = props.order.dishes?.reduce(
    (acc, dish) => acc + dish.quantity,
    0
  );

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
      }}
      onPress={() => {
        props.navigation.navigate('order-details-cashier', {
          order: props.order,
        });
      }}
    >
      <View
        style={{
          width: '75%',
          padding: 15,
          overflow: 'hidden',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#941B0C' }}>
          {props.order.table.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12 }}
        >{`${orderDishesQuantity} platos`}</Text>
        <View>
          <Text numberOfLines={1} style={{ fontSize: 12 }}>
            {props.order.dishes
              ?.map((dish) => `${dish.quantity} ${dish.name}`)
              .join(', ')}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '25%',
          backgroundColor: '#941B0C',
          borderTopEndRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesome5 name="money-bill-alt" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};
