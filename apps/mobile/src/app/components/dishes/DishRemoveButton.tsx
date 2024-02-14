import { deleteDoc, doc } from 'firebase/firestore';
import { View, TouchableHighlight, Image } from 'react-native';
import { firestore, storage } from '../../config/Firebase';
import { ref, deleteObject } from 'firebase/storage';
import { Item } from '../../model/item.model';

interface DishRemoveButtonProps {
  dish: Item;
}

export const DishRemoveButton = (props: DishRemoveButtonProps) => {
  const deteleDishImage = async () => {
    const imageRef = ref(
      storage,
      `dishes/${props.dish?.adminId}/${props.dish?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteDish = async () => {
    const dishRef = doc(firestore, 'dishes', props.dish.id);
    await deleteDoc(dishRef);
    await deteleDishImage();
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
        onPress={deleteDish}
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
