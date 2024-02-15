import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { View, TouchableHighlight, Image } from 'react-native';
import { storage, firestore } from '../../config/Firebase';
import { Item } from '../../model/item.model';

interface DrinkRemoveButtonProps {
  drink: Item;
}

export const DrinkRemoveButton = (props: DrinkRemoveButtonProps) => {
  const deteleDrinkImage = async () => {
    const imageRef = ref(
      storage,
      `drinks/${props.drink?.adminId}/${props.drink?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteDrink = async () => {
    const drinkRef = doc(firestore, 'drinks', props.drink.id);
    await deleteDoc(drinkRef);
    await deteleDrinkImage();
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
        onPress={deleteDrink}
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
