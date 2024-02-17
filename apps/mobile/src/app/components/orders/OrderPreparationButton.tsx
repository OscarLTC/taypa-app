import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Order } from '../../model/order.model';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';

interface OrderPreparationButtonProps {
  order: Order;
  status: string;
}

export const OrderPreparationButton = (props: OrderPreparationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const onStatusChangePress = async () => {
    setIsLoading(true);
    const orderId = props.order?.id;
    const orderRef = doc(firestore, 'orders', orderId);
    await updateDoc(orderRef, {
      status: 'preparacion',
      updatedAt: new Date(),
      dishes: props.order.dishes?.map((dish) => {
        return { ...dish, wasTaken: true };
      }),
      drinks: props.order.drinks?.map((drink) => {
        return { ...drink, wasTaken: true };
      }),
      additional: props.order.additional?.map((add) => {
        return { ...add, wasTaken: true };
      }),
      wasUpdated: false,
    });
    navigation.goBack();
    setIsLoading(false);
  };

  return (
    <TouchableHighlight
      disabled={isLoading}
      underlayColor={'#F6AA1C'}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#941B0C',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      delayPressOut={100}
      onPress={onStatusChangePress}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        Preparación
      </Text>
    </TouchableHighlight>
  );
};
