import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { Order } from '../../../model/order.model';
import { Platform, Text, TouchableHighlight } from 'react-native';

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
      props.navigation.goBack();
      props.setOrder({ ...props.order, status: 'listo' });
    }
  };

  return (
    <TouchableHighlight
      underlayColor={'#F6AA1C'}
      // @ts-expect-error position fixed is not available in web
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
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
