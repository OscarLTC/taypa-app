import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Order } from '../../model/order.model';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';

interface OrderStatusButtonProps {
  order: Order;
  status: string;
}

type Status = 'nueva' | 'preparacion' | 'listo' | 'servido';

export const OrderStatusButton = (props: OrderStatusButtonProps) => {
  const nextStatus: { [key in Status]?: Status } = {
    nueva: 'preparacion',
    preparacion: 'listo',
    listo: 'servido',
  };

  const [status, setStatus] = useState<Status>(props.status as Status);

  const navigation = useNavigation();

  const handleButtonClick = async () => {
    if (nextStatus[status] !== 'listo') {
      const orderId = props.order?.id;
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, {
        status: nextStatus[status],
        updatedAt: new Date(),
      });
      setStatus(nextStatus[status]!);
    }
    navigation.goBack();
  };

  return (
    <TouchableHighlight
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
      onPress={handleButtonClick}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        {nextStatus[status]}
      </Text>
    </TouchableHighlight>
  );
};
