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
import { ItemsListSkeleton } from '../orders/order-items/ItemsListSkeleton';
import { DrinkCard } from './DrinkCard';

interface DrinkListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const DrinkList = (props: DrinkListProps) => {
  const userData = useRecoilValue(userState);
  const isDrinkListFocused = useIsFocused();
  const [drinks, setDrinks] = useState<Item[]>();

  const adminId = userData?.userId;
  const drinksCollection = collection(firestore, 'drinks');
  const q = query(drinksCollection, where('adminId', '==', adminId));

  useEffect(() => {
    if (isDrinkListFocused) {
      const unsubscribe = onSnapshot(q, (drinkSnapshot) => {
        const drinks = drinkSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrinks(drinks as Item[]);
      });
      return () => unsubscribe();
    }
  }, [isDrinkListFocused]);

  return drinks ? (
    drinks.length > 0 ? (
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
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
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
          No hay bebidas
        </Text>
      </View>
    )
  ) : (
    <ItemsListSkeleton />
  );
};
