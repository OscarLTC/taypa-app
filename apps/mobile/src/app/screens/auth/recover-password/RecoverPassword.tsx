import React from 'react';

import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/Firebase';
interface RecoverScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const RecoverPassword = (props: RecoverScreenProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<{ email: string }>();

  const recoverPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        props.navigation.navigate('email-confirmation');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setError('email', {
            type: 'manual',
            message: 'Correo inválido',
          });
        }
        if (error.code === 'auth/user-not-found') {
          setError('email', {
            type: 'manual',
            message: 'Correo no registrado',
          });
        }
      });
  };

  const onSubmitPress: SubmitHandler<{ email: string }> = (data) => {
    recoverPassword(data.email);
  };

  return (
    <View style={{ backgroundColor: '#941B0C' }}>
      <View style={{ backgroundColor: '#0B0A0A6B', height: '100%' }}>
        <View style={{ marginTop: 32, padding: 30 }}>
          <View style={{ position: 'absolute', top: 160, right: -85 }}>
            <Image
              source={require('../../../../../assets/araña_fondo.png')}
              style={{ width: 250, height: 250 }}
            ></Image>
          </View>
          <View
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {'¿Olvidaste tu\ncontraseña?'}
            </Text>
            <Text
              style={{
                marginTop: 20,
                color: '#fff',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {'Ingrese su correo electrónico para\nrecuperar su contraseña'}
            </Text>
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Correo requerido',
                  value: true,
                },
                pattern: {
                  message: 'Correo inválido',
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Ingresar correo"
                  placeholderTextColor={'#F5F5F5'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('email');
                  }}
                  value={value}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    width: '100%',
                    borderRadius: 15,
                    marginTop: 40,
                    color: '#fff',
                    backgroundColor: errors.email ? '#CE3E21' : '#721708',
                  }}
                />
              )}
              name="email"
            />
            <TouchableOpacity
              onPress={handleSubmit(onSubmitPress)}
              style={{
                marginTop: 40,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#0B0A0A',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Recuperar contraseña</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <Image
              source={require('../../../../../assets/mono_fondo.png')}
              style={{ width: 160, height: 110 }}
            ></Image>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecoverPassword;
