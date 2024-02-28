import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { OrderModalInfoCook } from './OrderModalInfoCook';

export const OrderInfoListCook = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        //@ts-expect-error - web style
        style={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          bottom: 20,
          right: 30,
          backgroundColor: 'white',
          borderRadius: 100,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome5 name="question" size={25} color="gray" />
      </Pressable>
      <OrderModalInfoCook
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
