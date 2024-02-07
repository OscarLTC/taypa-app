import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { addDoc, collection } from 'firebase/firestore';
import { TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../config/Firebase';

export const TableAdd = ({ lastNumber }: { lastNumber: number }) => {
  const userData = useRecoilValue(userState);

  const addTable = async () => {
    const adminId = userData?.userId;
    const tablesCollection = collection(firestore, 'tables');
    const newTable = {
      adminId,
      number: lastNumber + 1,
      name: `Mesa ${lastNumber + 1}`,
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
        height: 60,
        width: '25%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AntDesign name="plus" size={25} color="white" />
    </TouchableHighlight>
  );
};
