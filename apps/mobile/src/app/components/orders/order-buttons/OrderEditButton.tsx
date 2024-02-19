import { updateDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';
import { subTotalAdditionalSelector } from '../../../storage/order/order-additional/orderAdditional.selector';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { subTotalDishesSelector } from '../../../storage/order/order-dishes/orderDishes.selector';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { subTotalDrinksSelector } from '../../../storage/order/order-drinks/orderDrinks.selector';
import { Order } from '../../../model/order.model';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderEditButtonProps {
  order: Order;
  navigation: NavigationProp<ParamListBase>;
  note: string;
}

export const OrderEditButton = (props: OrderEditButtonProps) => {
  const [dishes, setDishes] = useRecoilState(orderDishesState);
  const [drinks, setDrinks] = useRecoilState(orderDrinksState);
  const [additional, setAdditional] = useRecoilState(orderAdditionalState);
  const dishesTotal = useRecoilValue(subTotalDishesSelector);
  const drinksTotal = useRecoilValue(subTotalDrinksSelector);
  const additionalTotal = useRecoilValue(subTotalAdditionalSelector);

  const onRegisterOrderPress = () => {
    if (dishes.length === 0 && drinks.length === 0 && additional.length === 0) {
      return;
    }
    setIsLoading(true);
    const orderRef = doc(firestore, 'orders', props.order.id);
    updateDoc(orderRef, {
      dishes,
      drinks,
      additional,
      wasUpdated: true,
      status: 'nueva',
      total: props.order.total + dishesTotal + drinksTotal + additionalTotal,
      note: props.note ? props.note : '',
      updatedAt: new Date(),
    }).then(() => {
      setIsLoading(false);
      setDishes([]);
      setDrinks([]);
      setAdditional([]);
      props.navigation.navigate('roles-tables-waiter');
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <TouchableOpacity
      onPress={onRegisterOrderPress}
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
        Actualizar Orden
      </Text>
    </TouchableOpacity>
  );
};
