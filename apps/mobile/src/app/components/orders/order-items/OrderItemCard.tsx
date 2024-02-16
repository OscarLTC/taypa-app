import React, { useState } from 'react';
import { Item } from '../../../model/item.model';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { OrderModalAddItem } from './OrderModalAddDish';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';

interface OrderItemCardProps {
  item: Item;
  navigation: NavigationProp<ParamListBase>;
  type: 'dish' | 'drink' | 'additional';
}

export const OrderItemCard = (props: OrderItemCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dishes = useRecoilValue(orderDishesState);
  const drinks = useRecoilValue(orderDrinksState);
  const additional = useRecoilValue(orderAdditionalState);

  const isItemInOrder = (item: Item) => {
    if (props.type === 'dish') {
      return dishes.some((dish) => dish.id === item.id);
    } else if (props.type === 'drink') {
      return drinks.some((drink) => drink.id === item.id);
    } else {
      return additional.some((add) => add.id === item.id);
    }
  };

  return (
    <TouchableOpacity
      delayPressIn={100}
      delayPressOut={100}
      disabled={isItemInOrder(props.item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        padding: 10,
        opacity: isItemInOrder(props.item) ? 0.5 : 1,
      }}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Image
        source={
          props.item.image.url
            ? { uri: props.item.image.url }
            : require('../../../../../assets/lomo_saltado.png')
        }
        style={{
          width: '100%',
          height: 100,
          objectFit: 'contain',
          resizeMode: 'contain',
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
          {props.item.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#941B0C',
          }}
        >
          S/{Number(props.item.price).toFixed(2)}
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
      <OrderModalAddItem
        item={props.item}
        type={props.type}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
    </TouchableOpacity>
  );
};
