import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { firestore } from '../../../config/Firebase';

interface CancelOrderModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
  orderId: string;
  tableId: string;
}

export const CancelOrderModal = (props: CancelOrderModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onCancelOrderPress = async () => {
    setIsLoading(true);
    const orderRef = doc(firestore, 'orders', props.orderId);
    await updateDoc(orderRef, {
      status: 'cancelado',
    }).then(async () => {
      const tableRef = doc(firestore, 'tables', props.tableId);
      await updateDoc(tableRef, {
        isAvailable: true,
      });
      props.setModalVisible(!props.modalVisible);
      props.navigation.goBack();
      setIsLoading(false);
    });
  };

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
            padding: 30,
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
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Cancelar Orden
          </Text>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            {'¿Estás seguro que deseas\ncancelar la orden?'}
          </Text>

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
              disabled={isLoading}
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
              onPress={onCancelOrderPress}
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
    </Modal>
  );
};
