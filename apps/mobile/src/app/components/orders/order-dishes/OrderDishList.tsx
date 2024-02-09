import { ScrollView, Text, View } from 'react-native';
import { DishListSkeleton } from '../../dishes/DishListSkeleton';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Dish } from '../../../model/dish.model';
import { userState } from '../../../storage/user/user.atom';
import { OrderDishCard } from './OrderDishCard';

export const OrderDishList = () => {
  const userData = useRecoilValue(userState);
  const [dishes, setDishes] = useState<Dish[]>();

  const getDishes = async () => {
    const adminId = userData?.userId;
    const dishesCollection = collection(firestore, 'dishes');
    const q = query(dishesCollection, where('adminId', '==', adminId));
    const dishesSnapshot = await getDocs(q);
    const dishes = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishes(dishes as Dish[]);
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
            <OrderDishCard key={dish.id} dish={dish} />
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
