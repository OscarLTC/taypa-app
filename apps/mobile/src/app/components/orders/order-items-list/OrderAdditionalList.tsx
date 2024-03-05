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
import { additionalState } from '../../../storage/additional/additional.atom';
import { additionalSelector } from '../../../storage/additional/additional.selector';
import { additionalFilterState } from '../../../storage/additional/additionalFilter.atom';

interface OrderAdditionalListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAdditionalList = (props: OrderAdditionalListProps) => {
  const userData = useRecoilValue(userState);
  const additional = useRecoilValue(additionalSelector);
  const setAdditional = useSetRecoilState(additionalState);
  const resetFilter = useResetRecoilState(additionalFilterState);

  const getAdditional = async () => {
    const adminId = userData?.userId;
    const AdditionalCollection = collection(firestore, 'additional');
    const q = query(
      AdditionalCollection,
      where('adminId', '==', adminId),
      orderBy('name')
    );
    const additionalSnapshot = await getDocs(q);
    const additional = additionalSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAdditional(additional as Item[]);
  };

  useEffect(() => {
    getAdditional();

    return () => resetFilter();
  }, []);

  return additional ? (
    additional.length > 0 ? (
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
          {additional.map((a) => (
            <ItemAddCard
              key={a.id}
              type="additional"
              item={a}
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
          No hay Adicionales
        </Text>
      </View>
    )
  ) : (
    <ItemsListSkeleton />
  );
};
