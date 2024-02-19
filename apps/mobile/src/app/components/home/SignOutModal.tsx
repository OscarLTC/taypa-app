import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase';
import { useResetRecoilState } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { MaterialIcons } from '@expo/vector-icons';

interface SignOutModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
}

export const SignOutModal = (props: SignOutModalProps) => {
  const resetUser = useResetRecoilState(userState);

  const onSignOutPress = () => {
    props.navigation.navigate('sign-in');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resetUser();
      }
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
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#f29387',
              padding: 10,
              borderRadius: 100,
            }}
          >
            <MaterialIcons name="dangerous" size={30} color="#ba210f" />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Cerrar Sesión
          </Text>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            {'¿Está seguro que desea cerrar sesión\nen este dispositivo?'}
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
                  backgroundColor: '#941B0C',
                },
              ]}
              onPress={onSignOutPress}
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
