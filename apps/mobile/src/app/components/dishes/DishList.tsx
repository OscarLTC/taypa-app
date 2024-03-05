import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { firestore } from '../../config/Firebase';
import { Item } from '../../model/item.model';
import { userState } from '../../storage/user/user.atom';
import { DishCard } from './DishCard';
import { ItemsListSkeleton } from '../orders/order-items/ItemsListSkeleton';
import { dishesState } from '../../storage/dishes/dishes.atom';
import { dishesSelector } from '../../storage/dishes/dishes.selector';
import { dishesFilterState } from '../../storage/dishes/dishesFilter.atom';

interface DishListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const DishList = (props: DishListProps) => {
  const userData = useRecoilValue(userState);
  const isDishListFocused = useIsFocused();
  const dishesFiltered = useRecoilValue(dishesSelector);
  const setDishes = useSetRecoilState(dishesState);
  const resetFilter = useResetRecoilState(dishesFilterState);

  const adminId = userData?.userId;
  const dishesCollection = collection(firestore, 'dishes');
  const q = query(
    dishesCollection,
    where('adminId', '==', adminId),
    orderBy('name')
  );

  useEffect(() => {
    if (isDishListFocused) {
      const unsubscribe = onSnapshot(q, (dishSnapshot) => {
        const dishes = dishSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDishes(dishes as Item[]);
      });
      return () => {
        unsubscribe();
        resetFilter();
      };
    }
  }, [isDishListFocused]);

  return dishesFiltered ? (
    dishesFiltered.length > 0 ? (
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
          {dishesFiltered.map((dish) => (
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
