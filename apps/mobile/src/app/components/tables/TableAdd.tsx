import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { addDoc, collection } from 'firebase/firestore';
import { TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../config/Firebase';

interface TableAddProps {
  lastNumber: number;
}

export const TableAdd = (props: TableAddProps) => {
  const userData = useRecoilValue(userState);

  const addTable = async () => {
    const adminId = userData?.userId;
    const tablesCollection = collection(firestore, 'tables');
    const newTable = {
      adminId,
      number: props.lastNumber + 1,
      name: `Mesa ${props.lastNumber + 1}`,
      isAvailable: true,
    };
    await addDoc(tablesCollection, newTable);
  };

  return (
    <TouchableHighlight
      onPress={addTable}
      delayPressOut={200}
      underlayColor={'#B3B6B7'}
      style={{
        flexDirection: 'row',
        backgroundColor: '#D0CECE',
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height: 60,
        width: '28%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AntDesign name="plus" size={25} color="white" />
    </TouchableHighlight>
  );
};
