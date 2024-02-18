import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { firestore } from '../../config/Firebase';
import { Statuses } from '../../model/status.enum';
import { Order } from '../../model/order.model';

interface OrderReadyButtonProps {
  order: Order;
  status: string;
}
export const OrderReadyButton = (props: OrderReadyButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const onStatusChangePress = async () => {
    setIsLoading(true);
    const orderId = props.order?.id;
    const orderRef = doc(firestore, 'orders', orderId);
    await updateDoc(orderRef, {
      status: Statuses.Listo,
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
        Listo
      </Text>
    </TouchableHighlight>
  );
};
