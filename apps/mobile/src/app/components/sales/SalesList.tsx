import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ScrollView, Text, View } from 'react-native';
import { firestore } from '../../config/Firebase';
import { useEffect, useState } from 'react';
import { Order } from '../../model/order.model';
import { SaleCard } from './SaleCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SaleListSkeleton } from './SaleListSkeleton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { salesState } from '../../storage/sales/sales.atom';
import { salesFilterState } from '../../storage/sales/salesFilter.atom';

interface SalesListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const SalesList = (props: SalesListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useRecoilState(salesState);
  const filter = useRecoilValue(salesFilterState);
  const startOfDay = new Date(
    filter.getFullYear(),
    filter.getMonth(),
    filter.getDate(),
    0,
    0,
    0
  );

  const endOfDay = new Date(
    filter.getFullYear(),
    filter.getMonth(),
    filter.getDate(),
    23,
    59,
    59
  );

  const getSales = async () => {
    setIsLoading(true);
    const orderCollection = collection(firestore, 'orders');
    const q = query(
      orderCollection,
      where('status', 'in', ['completado', 'cancelado']),
      where('createdAt', '>=', startOfDay),
      where('createdAt', '<=', endOfDay),
      orderBy('createdAt', 'desc')
    );
    await getDocs(q).then((querySnapshot) => {
      const sales = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Order)
      );
      setSales(sales);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getSales();
  }, [filter]);

  return isLoading ? (
    <SaleListSkeleton />
  ) : sales?.length ?? 0 ? (
    <ScrollView
      showsVerticalScrollIndicator
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          margin: 10,
        }}
      >
        {sales && sales.length > 0 && (
          <>
            {sales.map((sale) => (
              <SaleCard
                navigation={props.navigation}
                key={sale.id}
                sale={sale}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {'No hay ventas registradas en esta fecha.'}
      </Text>
    </View>
  );
};
