import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Platform, Text, TouchableHighlight } from 'react-native';
import { Order } from '../../../model/order.model';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';

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
      // @ts-expect-error position fixed is not available in web
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        backgroundColor: '#941B0C',
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        bottom: 0,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: isLoading ? 0.5 : 1,
      }}
      delayPressOut={100}
      onPress={onStatusChangePress}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        Preparación
      </Text>
    </TouchableHighlight>
  );
};
