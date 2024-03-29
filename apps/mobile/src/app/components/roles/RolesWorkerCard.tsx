import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { Worker } from '../../model/woker.model';
import { useRecoilState } from 'recoil';
import { userLockedState } from '../../storage/userLocked/userLocked.atom';
import { firestore } from '../../config/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface RolesWorkerCardProps {
  worker: Worker;
  navigation: NavigationProp<ParamListBase>;
  role: string;
}

export const RolesWorkerCard = (props: RolesWorkerCardProps) => {
  const [userLocked, setUserLocked] = useRecoilState(userLockedState);

  const updateAvailability = async () => {
    const workerRef = doc(firestore, 'workers', props.worker.id);
    await updateDoc(workerRef, {
      isAvailable: false,
    });
  };

  const onWorkerPress = () => {
    updateAvailability();
    setUserLocked({
      ...userLocked,
      user: {
        id: props.worker.id,
        completeName: props.worker.names + ' ' + props.worker.lastnames,
      },
    });
    if (props.role === 'Mesero') {
      props.navigation.navigate('roles-tables-waiter');
    } else if (props.role === 'Cajero') {
      props.navigation.navigate('orders', {
        screen: 'order-list-cashier',
      });
    } else {
      props.navigation.navigate('orders', {
        screen: 'order-list-cook',
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 70,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        opacity: props.worker.isAvailable ? 1 : 0.5,
      }}
      key={props.worker.id}
    >
      <Image
        source={
          props.worker.image
            ? { uri: props.worker.image.url }
            : require('../../../../assets/foto_default.webp')
        }
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center',
          marginLeft: 10,
          position: 'absolute',
          objectFit: 'cover',
          borderRadius: 50,
          zIndex: 1,
          tintColor: props.worker.isAvailable ? undefined : 'black',
        }}
      />
      <TouchableHighlight
        underlayColor={'#F6AA1C'}
        delayPressOut={200}
        delayPressIn={100}
        // disabled={!props.worker.isAvailable}
        onPress={onWorkerPress}
        style={{
          paddingLeft: 70,
          paddingHorizontal: 10,
          height: '100%',
          width: '100%',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            fontSize: 15,
          }}
        >
          {`${props.worker.names} ${props.worker.lastnames}`}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
