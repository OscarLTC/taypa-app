import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { firestore } from '../../config/Firebase';
import { Table } from '../../model/table.model';
import { userState } from '../../storage/user/user.atom';

interface RolesTableListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const RolesTableList = (props: RolesTableListProps) => {
  const userData = useRecoilValue(userState);
  const [tables, setTables] = useState<Table[]>([]);
  const isTableListFocused = useIsFocused();

  const adminId = userData?.userId;
  const tablesCollection = collection(firestore, 'tables');
  const q = query(tablesCollection, where('adminId', '==', adminId));

  useEffect(() => {
    if (isTableListFocused) {
      const unsubscribe = onSnapshot(q, (tableSnapshot) => {
        const tables = tableSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTables(tables as Table[]);
      });
      return () => unsubscribe();
    }
  }, [isTableListFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 60,
        marginBottom: 50,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 4,
          gap: 15,
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        {tables
          .sort((a, b) => a.number - b.number)
          .map((table, index) => (
            <TouchableOpacity
              style={{
                backgroundColor:
                  table.usageStatus === 'disponible' ? '#AFE39C' : '#FB8C8C',
                borderRadius: 10,
                elevation: 1,
                height: 60,
                width: '25%',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={table.id}
              onPress={() => {
                props.navigation.navigate('orders', {
                  screen: 'order-details',
                  params: {
                    table,
                  },
                });
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {table.number}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};
