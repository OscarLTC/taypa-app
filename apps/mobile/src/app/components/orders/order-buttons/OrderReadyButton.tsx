import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Platform, Text, TouchableHighlight } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { Statuses } from '../../../model/status.enum';
import { ItemOrder, Order } from '../../../model/order.model';
import { Role } from '../../../model/roles.enum';

interface OrderReadyButtonProps {
  order: Order;
  status: string;
}
export const OrderReadyButton = (props: OrderReadyButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const combinedOrderItems = (items: ItemOrder[]) =>
    items.reduce((acc: ItemOrder[], dish: ItemOrder) => {
      const existingDish = acc.find((item) => item.id === dish.id);

      if (existingDish) {
        existingDish.quantity += dish.quantity;
        existingDish.subTotal += dish.subTotal;
      } else {
        acc.push(dish);
      }

      return acc;
    }, []);

  const addNotification = async () => {
    const notificationCollection = collection(firestore, 'notifications');
    await addDoc(notificationCollection, {
      adminId: props.order.adminId,
      message: `La ${props.order.table.name} está lista para ser servida.`,
      role: Role.Waiter,
      date: new Date(),
      isShown: false,
      wasSoundPlayed: false,
    });
  };

  const onStatusReadyPress = async () => {
    setIsLoading(true);
    const orderId = props.order?.id;
    const orderRef = doc(firestore, 'orders', orderId);
    await updateDoc(orderRef, {
      status: Statuses.Listo,
      dishes: combinedOrderItems(props.order.dishes || []),
      drinks: combinedOrderItems(props.order.drinks || []),
      additional: combinedOrderItems(props.order.additional || []),
    }).then(() => addNotification());
    navigation.goBack();
    setIsLoading(false);
  };

  return (
    <TouchableHighlight
      disabled={isLoading}
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
        opacity: isLoading ? 0.5 : 1,
      }}
      delayPressOut={100}
      onPress={onStatusReadyPress}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        Listo
      </Text>
    </TouchableHighlight>
  );
};
