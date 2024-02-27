import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../config/Firebase';
import { Item } from '../../model/item.model';
import { userState } from '../../storage/user/user.atom';
import { DishCard } from './DishCard';
import { ItemsListSkeleton } from '../orders/order-items/ItemsListSkeleton';

interface DishListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const DishList = (props: DishListProps) => {
  const userData = useRecoilValue(userState);
  const isDishListFocused = useIsFocused();
  const [dishes, setDishes] = useState<Item[]>();

  const adminId = userData?.userId;
  const dishesCollection = collection(firestore, 'dishes');
  const q = query(dishesCollection, where('adminId', '==', adminId));

  useEffect(() => {
    if (isDishListFocused) {
      const unsubscribe = onSnapshot(q, (dishSnapshot) => {
        const dishes = dishSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDishes(dishes as Item[]);
      });
      return () => unsubscribe();
    }
  }, [isDishListFocused]);

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
            <DishCard key={dish.id} dish={dish} navigation={props.navigation} />
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
    <ItemsListSkeleton />
  );
};
