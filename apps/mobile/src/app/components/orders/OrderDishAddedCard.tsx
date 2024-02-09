import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DishOrder } from '../../model/dish.model';
import { OrderModalDishEdit } from './OrderModalDishEdit';
import { useState } from 'react';

interface OrderDishAddedCardProps {
  dish: DishOrder;
}

export const OrderDishAddedCard = (props: OrderDishAddedCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onLongPress={() => {
        setModalVisible(true);
      }}
      style={{
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 110,
      }}
    >
      <Image
        style={{
          width: 110,
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        source={{ uri: props.dish.image.url }}
      />
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          display: 'flex',
          width: 100,
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
            fontWeight: 'bold',
            color: '#941B0C',
            fontSize: 12,
          }}
        >
          {`S/ ${props.dish.price.toFixed(2)}`}
        </Text>
      </View>
      <OrderModalDishEdit
        dish={props.dish}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </TouchableOpacity>
  );
};
