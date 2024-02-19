import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Order } from '../../../model/order.model';
import moment from 'moment';

interface OrderCardCashierProps {
  navigation: NavigationProp<ParamListBase>;
  order: Order;
}

export const OrderCardCashier = (props: OrderCardCashierProps) => {
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
          height: '100%',
          width: '75%',
          padding: 15,
          overflow: 'hidden',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#6a040f' }}>
          {props.order.table.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#0d1c0d',
          }}
        >
          <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 12 }}>
            Total:
          </Text>
          {` S/ ${Number(props.order.total).toFixed(2)} `}
        </Text>
        <Text
          style={{
            position: 'absolute',
            color: '#a8a8a8',
            bottom: 10,
            left: 15,
            fontSize: 12,
          }}
        >
          {moment(props.order.createdAt.toDate()).fromNow()}
        </Text>
      </View>
      <View
        style={{
          width: '25%',
          backgroundColor: '#6a040f',
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
