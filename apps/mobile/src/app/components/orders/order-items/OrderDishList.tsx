import { ScrollView, Text, View } from 'react-native';
import { DishListSkeleton } from '../../dishes/DishListSkeleton';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { OrderItemCard } from './OrderItemCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderDishListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDishList = (props: OrderDishListProps) => {
  const userData = useRecoilValue(userState);
  const [dishes, setDishes] = useState<Item[]>();

  const getDishes = async () => {
    const adminId = userData?.userId;
    const dishesCollection = collection(firestore, 'dishes');
    const q = query(dishesCollection, where('adminId', '==', adminId));
    const dishesSnapshot = await getDocs(q);
    const dishes = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishes(dishes as Item[]);
  };

  useEffect(() => {
    getDishes();
  });

  return dishes ? (
    dishes.length > 0 ? (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10, marginTop: 30 }}
        scrollEventThrottle={16}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {dishes.map((dish) => (
            <OrderItemCard
              key={dish.id}
              item={dish}
              navigation={props.navigation}
            />
          ))}
        </View>
      </ScrollView>
    ) : (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}
        >
          No hay platillos
        </Text>
      </View>
    )
  ) : (
    <DishListSkeleton />
  );
};
