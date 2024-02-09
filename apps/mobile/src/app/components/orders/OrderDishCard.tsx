import React, { useState } from 'react';
import { Dish } from '../../model/dish.model';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { OrderModalAddDish } from './OrderModalAddDish';

interface OrderDishCardProps {
  dish: Dish;
}

export const OrderDishCard = (props: OrderDishCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      delayPressIn={100}
      delayPressOut={100}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        padding: 10,
      }}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Image
        source={
          props.dish.image.url
            ? { uri: props.dish.image.url }
            : require('../../../../assets/lomo_saltado.png')
        }
        style={{
          width: '100%',
          height: 100,
          objectFit: 'contain',
        }}
      ></Image>
      <View
        style={{
          width: '100%',
          paddingTop: 10,
          borderTopColor: '#f2f2f2',
          borderTopWidth: 1,
          paddingHorizontal: 5,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            overflow: 'hidden',
            fontSize: 12,
          }}
        >
          {props.dish.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#941B0C',
          }}
        >
          S/{Number(props.dish.price).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: '#941B0C',
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <Octicons name="plus" size={15} color="white" />
        </View>
      </View>
      <OrderModalAddDish
        dish={props.dish}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </TouchableOpacity>
  );
};
