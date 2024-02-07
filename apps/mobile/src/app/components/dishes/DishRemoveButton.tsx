import { deleteDoc, doc } from 'firebase/firestore';
import { View, TouchableHighlight, Image } from 'react-native';
import { firestore } from '../../config/Firebase';

interface DishRemoveButtonProps {
  dishId: string;
}

export const DishRemoveButton = (props: DishRemoveButtonProps) => {
  const removeDish = () => {
    const dishRef = doc(firestore, 'dishes', props.dishId);
    deleteDoc(dishRef);
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    >
      <TouchableHighlight
        underlayColor={'#F6AA1C'}
        style={{
          padding: 8,
          backgroundColor: '#941B0C',
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
        delayPressOut={100}
        onPress={removeDish}
      >
        <Image
          style={{
            width: 15,
            height: 15,
          }}
          source={require('../../../../assets/tash_blanco.png')}
        />
      </TouchableHighlight>
    </View>
  );
};
