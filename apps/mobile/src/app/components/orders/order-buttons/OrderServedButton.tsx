import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { Text, TouchableHighlight } from 'react-native';

interface OrderServedButtonProps {
  order: Order;
  setOrder: (order: Order) => void;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderServedButton = (props: OrderServedButtonProps) => {
  const onServedStatusChangePress = async () => {
    if (props.order.status === 'listo') {
      const orderId = props.order.id;
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'servido',
      });
      props.setOrder({ ...props.order, status: 'listo' });
      props.navigation.goBack();
    }
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
      onPress={onServedStatusChangePress}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        Servido
      </Text>
    </TouchableHighlight>
  );
};
