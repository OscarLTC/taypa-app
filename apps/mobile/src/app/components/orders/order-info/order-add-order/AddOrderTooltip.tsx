import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

interface AddOrderToolTipProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export const AddOrderTooltip = (props: AddOrderToolTipProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          display: props.modalVisible ? 'flex' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      ></View>
      <View
        style={{
          height: '20%',
          width: '100%',
          backgroundColor: 'white',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 10,
          }}
        >
          <Pressable onPress={() => props.setModalVisible(false)}>
            <Ionicons name="remove-outline" size={30} color="#899494" />
          </Pressable>
          <View
            style={{
              height: '80%',
              width: '100%',
              justifyContent: 'center',
              paddingHorizontal: 50,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <MaterialIcons name="label-important" size={50} color="#899494" />
            <Text
              style={{
                fontSize: 13,
                textAlign: 'justify',
                color: '#899494',
                fontWeight: 'bold',
              }}
            >{`Para eliminar o cambiar la cantidad de un plato, bebida o adicional en tu orden, simplemente mantén presionado el elemento que deseas ajustar.`}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
