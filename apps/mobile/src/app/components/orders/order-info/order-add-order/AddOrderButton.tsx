import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { AddOrderTooltip } from './AddOrderTooltip';

export const AddOrderButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={{
          position: 'absolute',
          right: 0,
          alignSelf: 'center',
          borderRadius: 100,
          backgroundColor: '#F6AA1C',
          zIndex: 1,
          flexDirection: 'row',
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="info" size={25} color="white" />
      </Pressable>
      <AddOrderTooltip
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
