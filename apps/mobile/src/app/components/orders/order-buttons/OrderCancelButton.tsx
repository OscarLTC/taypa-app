import { useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderCancelButtonProps {
  orderId: string;
  tableId: string;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderCancelButton = (props: OrderCancelButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onCancelOrderPress = async () => {
    setLoading(true);
    const orderRef = doc(firestore, 'orders', props.orderId);
    await updateDoc(orderRef, {
      status: 'cancelado',
    }).then(async () => {
      const tableRef = doc(firestore, 'tables', props.tableId);
      await updateDoc(tableRef, {
        isAvailable: true,
      });
      props.navigation.goBack();
      setLoading(false);
    });
  };

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onCancelOrderPress}
      // @ts-expect-error position fixed is not available in web
      style={{
        backgroundColor: '#941B0C',
        paddingVertical: 5,
        paddingHorizontal: 15,
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        width: '100%',
        bottom: 0,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
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
        Cancelar Orden
      </Text>
    </TouchableOpacity>
  );
};
