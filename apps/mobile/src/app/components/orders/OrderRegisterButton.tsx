import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { firestore } from '../../config/Firebase';
import { Table } from '../../model/table.model';
import { orderDishesState } from '../../storage/order/order-dishes/orderDishes.atom';
import { useRecoilValue } from 'recoil';
import { subTotalDishesSelector } from '../../storage/order/order-dishes/orderDishes.selector';
import { userState } from '../../storage/user/user.atom';

interface OrderRegisterButtonProps {
  table: Table;
}

export const OrderRegisterButton = (props: OrderRegisterButtonProps) => {
  const userData = useRecoilValue(userState);
  const dishes = useRecoilValue(orderDishesState);
  const dishesTotal = useRecoilValue(subTotalDishesSelector);

  const onRegisterOrderPress = () => {
    setIsLoading(true);
    const orderRef = collection(firestore, 'orders');
    addDoc(orderRef, {
      adminId: userData?.userId,
      table: {
        id: props.table.id,
        name: props.table.name,
      },
      dishes: dishes.map((dish) => ({
        ...dish,
        image: dish.image.url,
      })),
      status: 'nueva',
      total: dishesTotal,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      updateDoc(doc(firestore, 'tables', props.table.id), {
        ...props.table,
        usageStatus: 'ocupada',
      }).catch((error) => {
        console.error('Error updating document: ', error);
      });
      setIsLoading(false);
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
        Registrar Orden
      </Text>
    </TouchableOpacity>
  );
};
