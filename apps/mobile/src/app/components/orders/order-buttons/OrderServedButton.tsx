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
        backgroundColor: '#941B0C',
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        bottom: 0,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      delayPressOut={100}
      onPress={onServedStatusChangePress}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        Servido
      </Text>
    </TouchableHighlight>
  );
};
