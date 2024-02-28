import { ScrollView, Text, View } from 'react-native';
import { TableAdd } from './TableAdd';
import { userState } from '../../storage/user/user.atom';
import { useRecoilValue } from 'recoil';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { useEffect, useState } from 'react';
import { Table } from '../../model/table.model';
import { useIsFocused } from '@react-navigation/native';
import { TableRemove } from './TableRemove';

export const TableList = () => {
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
          gap: 15,
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        {tables
          .sort((a, b) => a.number - b.number)
          .map((table, index) => {
            if (index === tables.length - 1) {
              return <TableRemove key={table.id} table={table} />;
            }
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  elevation: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  height: 60,
                  width: '28%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={table.id}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {table.number}
                </Text>
              </View>
            );
          })}
        <TableAdd lastNumber={tables.length} />
      </View>
    </ScrollView>
  );
};
