import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableHighlight, View } from 'react-native';
import { Table } from '../../model/table.model';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';

interface TableRemoveProps {
  table: Table;
}
export const TableRemove = (props: TableRemoveProps) => {
  const removeTable = async () => {
    const tableRef = doc(firestore, 'tables', props.table.id);
    deleteDoc(tableRef);
  };

  return (
    <TouchableHighlight
      style={{
        backgroundColor: '#FEA1A1',
        borderRadius: 10,
        elevation: 1,
        height: 60,
        width: '25%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={removeTable}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons
          style={{
            position: 'absolute',
            right: 2,
            bottom: 3,
          }}
          name="trash"
          size={20}
          color="white"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          {props.table.number}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
