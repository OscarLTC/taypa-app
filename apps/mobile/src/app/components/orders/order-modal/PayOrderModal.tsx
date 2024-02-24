import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { Controller, useForm } from 'react-hook-form';

interface PayOrderModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
  orderId: string;
  tableId: string;
}

export const PayOrderModal = (props: PayOrderModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const resetDishes = useResetRecoilState(orderDishesState);
  const resetDrinks = useResetRecoilState(orderDrinksState);
  const resetAdditional = useResetRecoilState(orderAdditionalState);

  const { control, watch, setValue } = useForm<{
    method: string;
    color: string;
  }>();

  const paymentMethods = [
    {
      method: 'Yape',
      color: '#5e0a71',
    },
    {
      method: 'Plin',
      color: '#14d9c9',
    },
    {
      method: 'Efectivo',
      color: '#00986d',
    },
    {
      method: 'Tarjeta',
      color: '#ef8c1a',
    },
    {
      method: 'Otro',
      color: '#553208',
    },
  ];

  const onPayOrderPress = async () => {
    setIsLoading(true);
    if (!watch('method')) return setIsLoading(false);
    const orderRef = doc(firestore, 'orders', props.orderId);
    await updateDoc(orderRef, {
      status: 'completado',
      paymentMethod: watch('method'),
      updatedAt: new Date(),
    }).then(() => {
      props.setModalVisible(!props.modalVisible);
      props.navigation.goBack();
      const tableRef = doc(firestore, 'tables', props.tableId);
      updateDoc(tableRef, {
        isAvailable: true,
      }).then(() => {
        resetDishes();
        resetDrinks();
        resetAdditional();
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setValue('method', '');
  }, [props.modalVisible]);

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
            justifyContent: 'center',
            flexDirection: 'column',
            elevation: 5,
            gap: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Método de Pago
          </Text>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            {'Seleccione el método de pago para\ncompletar la orden.'}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: 10,
              marginBottom: 15,
              gap: 10,
            }}
          >
            {paymentMethods.map((method, index) => (
              <Controller
                key={index}
                control={control}
                name="method"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      width: '30%',
                      borderRadius: 10,
                      padding: 5,
                      elevation: 2,
                      backgroundColor:
                        value === method.method ? method.color : '#D9D9D9',
                    }}
                    onPress={() => onChange(method.method)}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {method.method}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ))}
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
              disabled={isLoading}
              activeOpacity={0.6}
              style={[
                {
                  borderRadius: 10,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: '#941B0C',
                },
              ]}
              onPress={onPayOrderPress}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
