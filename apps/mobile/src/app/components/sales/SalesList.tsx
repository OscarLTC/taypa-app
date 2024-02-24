import { collection, getDocs, query, where } from 'firebase/firestore';
import { ScrollView, Text, View } from 'react-native';
import { firestore } from '../../config/Firebase';
import { useEffect, useState } from 'react';
import { Order } from '../../model/order.model';
import { SaleCard } from './SaleCard';

export const SalesList = () => {
  const [todaySales, setTodaySales] = useState<Order[]>();
  const [otherSales, setOtherSales] = useState<Order[]>();

  const getSales = async () => {
    const orderCollection = collection(firestore, 'orders');
    const q = query(
      orderCollection,
      where('status', 'in', ['completado', 'cancelado'])
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
        sales
          .filter(
            (sale) => sale.createdAt.toDate().getDate() === new Date().getDate()
          )
          .sort((a, b) => Number(b.createdAt) - Number(a.createdAt)) as Order[]
      );
      setOtherSales(
        sales
          .filter(
            (sale) => sale.createdAt.toDate().getDate() !== new Date().getDate()
          )
          .sort((a, b) => Number(b.createdAt) - Number(a.createdAt)) as Order[]
      );
    });
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
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
        {todaySales && (
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
            {todaySales?.map((sale) => (
              <SaleCard key={sale.id} sale={sale} />
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
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};
