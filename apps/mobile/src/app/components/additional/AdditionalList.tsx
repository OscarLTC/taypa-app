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
import { ItemsListSkeleton } from '../orders/order-items/ItemsListSkeleton';
import { AdditionalCard } from './AdditionalCard';
import { additionalSelector } from '../../storage/additional/additional.selector';
import { additionalState } from '../../storage/additional/additional.atom';
import { additionalFilterState } from '../../storage/additional/additionalFilter.atom';

interface AdditionalListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const AdditionalList = (props: AdditionalListProps) => {
  const userData = useRecoilValue(userState);
  const isAdditionalListFocused = useIsFocused();
  const additional = useRecoilValue(additionalSelector);
  const setAdditional = useSetRecoilState(additionalState);
  const resetFilter = useResetRecoilState(additionalFilterState);

  const adminId = userData?.userId;
  const additionalCollection = collection(firestore, 'additional');
  const q = query(
    additionalCollection,
    where('adminId', '==', adminId),
    orderBy('name')
  );

  useEffect(() => {
    if (isAdditionalListFocused) {
      const unsubscribe = onSnapshot(q, (additionalSnapshot) => {
        const additional = additionalSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdditional(additional as Item[]);
      });
      return () => {
        unsubscribe();
        resetFilter();
      };
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
