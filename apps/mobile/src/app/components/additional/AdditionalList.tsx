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
import { AdditionalCard } from './AdditionalCard';

interface AdditionalListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const AdditionalList = (props: AdditionalListProps) => {
  const userData = useRecoilValue(userState);
  const isAdditionalListFocused = useIsFocused();
  const [additional, setAdditional] = useState<Item[]>();

  const adminId = userData?.userId;
  const additionalCollection = collection(firestore, 'additional');
  const q = query(additionalCollection, where('adminId', '==', adminId));

  useEffect(() => {
    if (isAdditionalListFocused) {
      const unsubscribe = onSnapshot(q, (additionalSnapshot) => {
        const additional = additionalSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdditional(additional as Item[]);
      });
      return () => unsubscribe();
    }
  }, [isAdditionalListFocused]);
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
          {additional.map((additional) => (
            <AdditionalCard
              key={additional.id}
              additional={additional}
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
          No hay adicionales
        </Text>
      </View>
    )
  ) : (
    <ItemsListSkeleton />
  );
};
