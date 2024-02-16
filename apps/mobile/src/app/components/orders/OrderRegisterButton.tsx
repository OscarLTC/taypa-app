import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { firestore } from '../../config/Firebase';
import { Table } from '../../model/table.model';
import { orderDishesState } from '../../storage/order/order-dishes/orderDishes.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subTotalDishesSelector } from '../../storage/order/order-dishes/orderDishes.selector';
import { userState } from '../../storage/user/user.atom';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { orderDrinksState } from '../../storage/order/order-drinks/orderDrinks.atom';
import { orderAdditionalState } from '../../storage/order/order-additional/orderAdditional.atom';

interface OrderRegisterButtonProps {
  table: Table;
  navigation: NavigationProp<ParamListBase>;
  note: string;
}

export const OrderRegisterButton = (props: OrderRegisterButtonProps) => {
  const userData = useRecoilValue(userState);
  const [dishes, setDishes] = useRecoilState(orderDishesState);
  const [drinks, setDrinks] = useRecoilState(orderDrinksState);
  const [additional, setAdditional] = useRecoilState(orderAdditionalState);
  const dishesTotal = useRecoilValue(subTotalDishesSelector);

  const onRegisterOrderPress = () => {
    console.log(props.note);
    if (dishes.length === 0 && drinks.length === 0 && additional.length === 0) {
      return;
    }
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
        image: dish.image,
        wasTaken: false,
      })),
      drinks: drinks.map((drink) => ({
        ...drink,
        image: drink.image,
        wasTaken: false,
      })),
      additional: additional.map((add) => ({
        ...add,
        image: add.image,
        wasTaken: false,
      })),
      status: 'nueva',
      total: dishesTotal,
      note: props.note,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      updateDoc(doc(firestore, 'tables', props.table.id), {
        isAvailable: false,
      }).catch((error) => {
        console.error('Error updating document: ', error);
      });
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
        Registrar Orden
      </Text>
    </TouchableOpacity>
  );
};
