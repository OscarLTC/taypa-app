import { Image, Text, TouchableOpacity } from 'react-native';
import { DishOrder } from '../../../model/dish.model';
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
        width: 110,
        padding: 5,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          objectFit: 'contain',
        }}
        source={{ uri: props.dish.image.url }}
      />

      <Text
        numberOfLines={2}
        style={{
          padding: 5,
          overflow: 'hidden',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#941B0C',
        }}
      >
        {props.dish.name}
      </Text>
      <OrderModalDishEdit
        dish={props.dish}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </TouchableOpacity>
  );
};
