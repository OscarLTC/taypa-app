import { ScrollView, Text, View } from 'react-native';
import { ItemsListSkeleton } from '../order-items/ItemsListSkeleton';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { ItemAddCard } from '../order-items/ItemAddCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { dishesSelector } from '../../../storage/dishes/dishes.selector';
import { dishesState } from '../../../storage/dishes/dishes.atom';
import { dishesFilterState } from '../../../storage/dishes/dishesFilter.atom';

interface OrderDishListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDishList = (props: OrderDishListProps) => {
  const userData = useRecoilValue(userState);
  const dishes = useRecoilValue(dishesSelector);
  const setDishes = useSetRecoilState(dishesState);
  const resetFilter = useResetRecoilState(dishesFilterState);

  const getDishes = async () => {
    const adminId = userData?.userId;
    const dishesCollection = collection(firestore, 'dishes');
    const q = query(
      dishesCollection,
      where('adminId', '==', adminId),
      orderBy('name')
    );
    const dishesSnapshot = await getDocs(q);
    const dishes = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishes(dishes as Item[]);
  };

  useEffect(() => {
    getDishes();

    return () => resetFilter();
  }, []);

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
            <ItemAddCard
              key={dish.id}
              type="dish"
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
    <ItemsListSkeleton />
  );
};
