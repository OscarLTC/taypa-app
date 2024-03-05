import { ScrollView, Text, View } from 'react-native';
import { ItemsListSkeleton } from '../order-items/ItemsListSkeleton';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { ItemAddCard } from '../order-items/ItemAddCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { drinksSelector } from '../../../storage/drinks/drinks.selector';
import { drinksState } from '../../../storage/drinks/drinks.atom';
import { drinksFilterState } from '../../../storage/drinks/drinksFilter.atom';

interface OrderDrinkListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDrinkList = (props: OrderDrinkListProps) => {
  const userData = useRecoilValue(userState);
  const drinks = useRecoilValue(drinksSelector);
  const setDrinks = useSetRecoilState(drinksState);
  const resetFilter = useResetRecoilState(drinksFilterState);

  const getDrinks = async () => {
    const adminId = userData?.userId;
    const drinksCollection = collection(firestore, 'drinks');
    const q = query(drinksCollection, where('adminId', '==', adminId));
    const drinksSnapshot = await getDocs(q);
    const drinks = drinksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrinks(drinks as Item[]);
  };

  useEffect(() => {
    getDrinks();

    return () => resetFilter();
  }, []);

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
            <ItemAddCard
              key={drink.id}
              type="drink"
              item={drink}
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
          No hay Bebidas
        </Text>
      </View>
    )
  ) : (
    <ItemsListSkeleton />
  );
};
