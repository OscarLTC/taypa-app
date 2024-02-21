import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useResetRecoilState } from 'recoil';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';

interface OrderPayButtonProps {
  orderId: string;
  tableId: string;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderPayButton = (props: OrderPayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const resetDishes = useResetRecoilState(orderDishesState);
  const resetDrinks = useResetRecoilState(orderDrinksState);
  const resetAdditional = useResetRecoilState(orderAdditionalState);

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
      }).then(() => {
        resetDishes();
        resetDrinks();
        resetAdditional();
      });
      setIsLoading(false);
    });
  };

  return (
    <TouchableOpacity
      onPress={onPayOrderPress}
      disabled={isLoading}
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
