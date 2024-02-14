import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Item } from '../../../model/item.model';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { itemOrder } from '../../../model/order.model';

interface OrderModalAddItemProps {
  item: Item;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderModalAddItem = (props: OrderModalAddItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const [dishes, setDishes] = useRecoilState(orderDishesState);

  const onAddPress = () => {
    const dishOrder: itemOrder = {
      id: props.item.id,
      name: props.item.name,
      price: props.item.price,
      image: {
        url: props.item.image.url,
      },
      subTotal: Number(props.item.price) * quantity,
      quantity: quantity,
      isPreparing: false,
    };
    setDishes([...dishes, dishOrder]);
    props.setModalVisible(!props.modalVisible);
    props.navigation.goBack();
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
              backgroundColor: '#e2a0a0',
              paddingVertical: 5,
              paddingHorizontal: 30,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Image
              source={
                props.item.image.url
                  ? { uri: props.item.image.url }
                  : require('../../../../../assets/lomo_saltado.png')
              }
              style={{
                width: 250,
                height: 200,
                objectFit: 'contain',
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 30,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {props.item.name}
              </Text>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#FBD8D8',
                  borderRadius: 20,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#941B0C',
                  }}
                >
                  S/ {Number(props.item?.price).toFixed(2)}
                </Text>
              </View>
            </View>
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
                    paddingHorizontal: 20,
                    elevation: 2,
                    backgroundColor: '#941B0C',
                  },
                ]}
                onPress={onAddPress}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Añadir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
