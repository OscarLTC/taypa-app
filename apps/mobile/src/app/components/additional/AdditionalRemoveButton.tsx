import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { View, TouchableHighlight, Image } from 'react-native';
import { storage, firestore } from '../../config/Firebase';
import { Item } from '../../model/item.model';

interface AdditionalRemoveButtonProps {
  additional: Item;
}

export const AdditionalRemoveButton = (props: AdditionalRemoveButtonProps) => {
  const deteleAdditionalImage = async () => {
    const imageRef = ref(
      storage,
      `additional/${props.additional?.adminId}/${props.additional?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteAdditional = async () => {
    const additionalkRef = doc(firestore, 'additional', props.additional.id);
    await deleteDoc(additionalkRef);
    await deteleAdditionalImage();
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
        onPress={deleteAdditional}
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
