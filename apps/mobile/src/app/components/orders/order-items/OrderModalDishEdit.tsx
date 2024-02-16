import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { itemOrder } from '../../../model/order.model';
import { useRecoilState } from 'recoil';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { useState } from 'react';

interface OrderModalDishEditProps {
  dish: itemOrder;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const OrderModalDishEdit = (props: OrderModalDishEditProps) => {
  const [dishes, setDishes] = useRecoilState(orderDishesState);
  const [quantity, setQuantity] = useState<number>(props.dish.quantity);

  const onRemovePress = () => {
    const newDishes = dishes.filter((dish) => dish.id !== props.dish.id);
    setDishes(newDishes);
    props.setModalVisible(!props.modalVisible);
  };

  const onEditPress = () => {
    const newDishes = dishes.map((dish) => {
      if (dish.id === props.dish.id) {
        const newDish = {
          ...dish,
          quantity: quantity,
          subTotal: Number(dish.price) * quantity,
        };
        return newDish;
      }
      return dish;
    });
    setDishes(newDishes);
    props.setModalVisible(!props.modalVisible);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 30,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            gap: 20,
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Image
              source={
                props.dish.image.url
                  ? { uri: props.dish.image.url }
                  : require('../../../../../assets/lomo_saltado.png')
              }
              style={{
                width: 200,
                height: 100,
                objectFit: 'contain',
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            {props.dish.name}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={quantity <= 1}
              style={{
                borderRadius: 10,
                width: 30,
                height: 30,
                elevation: 2,
                backgroundColor: quantity <= 1 ? '#E8E7E7' : '#941B0C',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setQuantity(quantity - 1)}
            >
              <Text
                style={{
                  color: quantity <= 1 ? 'black' : 'white',
                  fontWeight: 'bold',
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                borderRadius: 10,
                width: 30,
                height: 30,
                elevation: 2,
                backgroundColor: '#941B0C',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 30,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                borderRadius: 10,
                padding: 10,
                elevation: 2,
                backgroundColor: '#5C5C5C',
              }}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                {
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: quantity !== props.dish.quantity ? 20 : 15,
                  elevation: 2,
                  backgroundColor: '#941B0C',
                },
              ]}
              onPress={
                quantity !== props.dish.quantity ? onEditPress : onRemovePress
              }
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {quantity !== props.dish.quantity ? 'Editar' : 'Eliminar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
