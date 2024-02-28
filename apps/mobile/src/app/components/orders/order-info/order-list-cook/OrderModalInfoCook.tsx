import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

interface OrderModalInfoCookProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export const OrderModalInfoCook = (props: OrderModalInfoCookProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.modalVisible}>
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></View>
      <View
        style={{
          height: '25%',
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
            paddingHorizontal: 20,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Pressable onPress={() => props.setModalVisible(false)}>
            <Ionicons name="remove-outline" size={30} color="#899494" />
          </Pressable>
          <View
            style={{
              width: '80%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '75%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FB8C8C',
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FontAwesome name="bell" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  width: '70%',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                Tienes una nueva orden
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
                backgroundColor: '#F6AA1C',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FontAwesome name="fire" size={20} color="white" />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                  width: '70%',
                  color: 'white',
                }}
              >
                La orden está en preparación
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
                backgroundColor: '#AFE39C',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FontAwesome name="check" size={20} color="white" />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                  width: '70%',
                  color: 'white',
                }}
              >
                La orden está lista para servir
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
