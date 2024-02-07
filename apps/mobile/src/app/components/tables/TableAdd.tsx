import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { addDoc, collection } from 'firebase/firestore';
import { TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../config/Firebase';
import { tablesSelector } from '../../storage/tables/tables.selector';

export const TableAdd = () => {
  const userData = useRecoilValue(userState);
  const refreshTables = useRecoilRefresher_UNSTABLE(tablesSelector);

  const addTable = async () => {
    const adminId = userData?.userId;
    const tablesCollection = collection(firestore, 'tables');
    const newTable = {
      adminId,
      number: 1,
    };
    await addDoc(tablesCollection, newTable);
    refreshTables();
  };

  return (
    <TouchableHighlight
      onPress={addTable}
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
