import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { auth } from '../../config/Firebase';
import { userState } from '../../storage/user/user.atom';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface UnlockViewModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
}

export const UnlockViewModal = (props: UnlockViewModalProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<{ password: string }>();

  const [userData, setUserData] = useRecoilState(userState);

  const validatePassword = async (password: string) => {
    if (userData) {
      const email = userData.email ?? '';
      await signInWithEmailAndPassword(auth, email, password).then(
        () => {
          setUserData({ ...userData, isLocked: false });
          props.setModalVisible(!props.modalVisible);
          props.navigation.navigate('home');
        },
        (error) => {
          setError('password', {
            type: 'manual',
            message: 'Contraseña incorrecta',
          });
        }
      );
      setValue('password', '');
    }
  };

  const onSubmitPress = (data: { password: string }) => {
    validatePassword(data.password);
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
            Desbloquear Vista Administrativa
          </Text>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontSize: 10,
            }}
          >
            {'Confirme su contraseña para\ndesbloquear.'}
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: errors.password ? 1 : 0,
                  borderColor: errors.password ? '#CE3E21' : '#0000001A',
                  backgroundColor: '#0000001A',
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                onFocus={() => {
                  clearErrors('password');
                }}
                value={value}
                placeholder="Contraseña"
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: 'Contraseña requerida' }}
          />
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
                shadowRadius: 4,
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
                  shadowRadius: 4,
                  backgroundColor: '#941B0C',
                },
              ]}
              onPress={handleSubmit(onSubmitPress)}
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
