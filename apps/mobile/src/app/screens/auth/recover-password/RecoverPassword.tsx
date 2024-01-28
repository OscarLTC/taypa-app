import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { auth } from '../../../config/Firebase';

/* eslint-disable-next-line */
export interface RecoverScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function RecoverPassword(props: RecoverScreenProps) {
  const [email, setEmail] = useState('');

  const recoverPassword = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        props.navigation.navigate('email-confirmation');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Correo inválido', ToastAndroid.SHORT);
        }
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show('Usuario no encontrado', ToastAndroid.SHORT);
        }
      });
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
              {'Ingrese su correo electrónico para recuperar su contraseña'}
            </Text>
            <TextInput
              placeholder="Ingresar correo"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 15,
              }}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity onPress={recoverPassword}>
              <View
                style={{
                  marginTop: 40,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#0B0A0A',
                  width: '100%',
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: 'white' }}>Recuperar contraseña</Text>
              </View>
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
}

export default RecoverPassword;
