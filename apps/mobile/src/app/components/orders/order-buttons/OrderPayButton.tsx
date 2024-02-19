import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderPayButtonProps {
  orderId: string;
  tableId: string;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderPayButton = (props: OrderPayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPayOrderPress = async () => {
    setIsLoading(true);
    const orderRef = doc(firestore, 'orders', props.orderId);
    await updateDoc(orderRef, {
      status: 'completado',
    }).then(() => {
      props.navigation.goBack();
      const tableRef = doc(firestore, 'tables', props.tableId);
      updateDoc(tableRef, {
        isAvailable: true,
      });
      setIsLoading(false);
    });
  };

  return (
    <TouchableOpacity
      onPress={onPayOrderPress}
      disabled={isLoading}
      style={{
        backgroundColor: '#941B0C',
        paddingVertical: 5,
        paddingHorizontal: 15,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        Pagar
      </Text>
    </TouchableOpacity>
  );
};
