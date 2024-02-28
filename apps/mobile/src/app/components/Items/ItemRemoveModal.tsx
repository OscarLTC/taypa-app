import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ItemRemoveModalProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onRemovePress: () => void;
  itemName: string;
}

export const ItemRemoveModal = (props: ItemRemoveModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 10,
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#f29387',
              padding: 10,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="dangerous" size={30} color="#ba210f" />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {'¿Estás seguro que deseas\neliminar '}
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#941B0C',
                }}
              >
                {`${props.itemName}?`}
              </Text>
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 30,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 30,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: '#5C5C5C',
                }}
                onPress={() => props.setModalVisible(!props.modalVisible)}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  {
                    borderRadius: 10,
                    padding: 10,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    backgroundColor: '#941B0C',
                  },
                ]}
                onPress={() => {
                  props.onRemovePress();
                  props.setModalVisible(!props.modalVisible);
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
