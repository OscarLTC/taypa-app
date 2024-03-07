import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ScrollView, Text, View } from 'react-native';
import { firestore } from '../../config/Firebase';
import { useEffect, useState } from 'react';
import { Order } from '../../model/order.model';
import { SaleCard } from './SaleCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SaleListSkeleton } from './SaleListSkeleton';

interface SalesListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const SalesList = (props: SalesListProps) => {
  const [todaySales, setTodaySales] = useState<Order[]>();
  const [otherSales, setOtherSales] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getSales = async () => {
    setIsLoading(true);
    const orderCollection = collection(firestore, 'orders');
    const q = query(
      orderCollection,
      where('status', 'in', ['completado', 'cancelado']),
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
      setTodaySales(
        sales.filter(
          (sale) => sale.createdAt.toDate().getDate() === new Date().getDate()
        )
      );
      setOtherSales(
        sales.filter(
          (sale) => sale.createdAt.toDate().getDate() !== new Date().getDate()
        )
      );
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getSales();
  }, []);

  return isLoading ? (
    <SaleListSkeleton />
  ) : (todaySales?.length ?? 0) + (otherSales?.length ?? 0) > 0 ? (
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
        {todaySales && todaySales.length > 0 && (
          <>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#6a040f',
                paddingLeft: 10,
              }}
            >
              Hoy
            </Text>
            {todaySales.map((sale) => (
              <SaleCard
                navigation={props.navigation}
                key={sale.id}
                sale={sale}
              />
            ))}
          </>
        )}

        {otherSales && (
          <>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#6a040f',
                paddingLeft: 10,
              }}
            >
              Días anteriores
            </Text>
            {otherSales?.map((sale) => (
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
        No hay ventas registradas el día de hoy ni en días anteriores
      </Text>
    </View>
  );
};
