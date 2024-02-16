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
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const onStatusChangePress = async () => {
    setIsLoading(true);
    /*TODO: Que cuando el estado se tenga que cambiar a preparacion, a la vez
    se cambie la propuiedad 'wasTaken' de los items(dishes, drinks, additional) a true
    */
    if (nextStatus[status] !== 'servido') {
      const orderId = props.order?.id;
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, {
        status: nextStatus[status],
        updatedAt: new Date(),
      });
      setStatus(nextStatus[status]!);
    }
    navigation.goBack();
    setIsLoading(false);
  };

  return (
    props.order.status !== 'listo' && (
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
          {nextStatus[status]}
        </Text>
      </TouchableHighlight>
    )
  );
};
