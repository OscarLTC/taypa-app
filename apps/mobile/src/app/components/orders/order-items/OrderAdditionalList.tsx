import { ScrollView, Text, View } from 'react-native';
import { ItemsListSkeleton } from './ItemsListSkeleton';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { OrderItemCard } from './OrderItemCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderAdditionalListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAdditionalList = (props: OrderAdditionalListProps) => {
  const userData = useRecoilValue(userState);
  const [additional, setAdditional] = useState<Item[]>();

  const getAdditional = async () => {
    const adminId = userData?.userId;
    const AdditionalCollection = collection(firestore, 'additional');
    const q = query(AdditionalCollection, where('adminId', '==', adminId));
    const additionalSnapshot = await getDocs(q);
    const additional = additionalSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAdditional(additional as Item[]);
  };

  useEffect(() => {
    getAdditional();
  });

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
            <OrderItemCard
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
