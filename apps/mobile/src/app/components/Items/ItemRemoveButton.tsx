import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { View, TouchableHighlight } from 'react-native';
import { storage, firestore } from '../../config/Firebase';
import { Item, ItemType } from '../../model/item.model';
import { getItemTypeRef } from '../../utils/getItemTypeRef';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ItemRemoveModal } from './ItemRemoveModal';
import Toast from 'react-native-toast-message';

interface ItemRemoveButtonProps {
  item: Item;
  type: ItemType;
}

export const ItemRemoveButton = (props: ItemRemoveButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const deteleItemImage = async () => {
    const imageRef = ref(
      storage,
      `${getItemTypeRef(props.type)}/${props.item?.adminId}/${
        props.item?.image.name
      }`
    );
    await deleteObject(imageRef);
  };

  const deleteItem = async () => {
    const itemRef = doc(firestore, getItemTypeRef(props.type), props.item.id);
    await deleteDoc(itemRef);
    deteleItemImage();
    setModalVisible(false);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: `${props.item.name} eliminado correctamente`,
      visibilityTime: 2000,
    });
  };

  return (
    <>
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
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="trash" size={15} color="white" />
        </TouchableHighlight>
      </View>
      <ItemRemoveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onRemovePress={deleteItem}
        itemName={props.item.name}
      />
    </>
  );
};
