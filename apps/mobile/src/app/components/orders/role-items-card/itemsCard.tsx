import { Image, Text, TouchableOpacity, View } from 'react-native';
import { OrderModalDishEdit } from '../order-items/OrderModalItemEdit';
import { useState } from 'react';
import { ItemOrder } from '../../../model/order.model';

interface ItemsCardProps {
  item: ItemOrder;
  type: 'dish' | 'drink' | 'additional';
}

export const ItemsCard = (props: ItemsCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      disabled={props.item.wasTaken}
      onLongPress={() => {
        setModalVisible(true);
      }}
      style={{
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 110,
        width: 110,
        opacity: props.item.wasTaken ? 0.5 : 1,
      }}
    >
      <View
        style={{
          height: 60,
          borderRadius: 15,
          padding: 5,
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            objectFit: 'contain',
          }}
          resizeMode="contain"
          source={{ uri: props.item.image.url }}
        />
      </View>

      <View
        style={{
          display: 'flex',
          paddingRight: 15,
          height: 50,
          zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            width: 20,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#941B0C',
            borderRightColor: '#b8bdc2',
            borderRightWidth: 1,
          }}
        >
          {props.item.quantity}
        </Text>
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
          {props.item.name}
        </Text>
      </View>
      <OrderModalDishEdit
        type={props.type}
        item={props.item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </TouchableOpacity>
  );
};
