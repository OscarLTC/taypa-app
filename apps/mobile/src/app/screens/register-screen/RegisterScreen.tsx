import { NavigationProp } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { auth } from '../../config/Firebase';

/* eslint-disable-next-line */
export interface RegisterScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function RegisterScreen(props: RegisterScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential.user);
        props.navigation.navigate('home');
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('El correo ya esta en uso', ToastAndroid.SHORT);
        }
      });
  };

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = (password: string) => {
    return password === confirmPassword;
  };

  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    }
    if (!validateConfirmPassword(password)) {
      setConfirmPasswordError(true);
      return;
    }
    register();
  };

  return (
    <View style={{ backgroundColor: '#941B0C', height: '100%' }}>
      <View style={{ marginTop: 32, padding: 30 }}>
        <View style={{ position: 'absolute', top: 100, right: -125 }}>
          <Image
            source={require('../../../../assets/araña_fondo.png')}
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
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF' }}>
            Registrarse
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 50,
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <View>
              <TextInput
                placeholder="Ingresar correo"
                placeholderTextColor={'#F5F5F5'}
                inputMode="email"
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setEmailError(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: '#fff',
                  backgroundColor: emailError ? '#CE3E21' : '#621708',
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 8,
                  marginLeft: 10,
                  display: emailError ? 'flex' : 'none',
                }}
              >
                El correo debe ser un formato valido (ejemplo@dominio.com)
              </Text>
            </View>

            <View>
              <TextInput
                placeholder="Ingresar contraseña"
                placeholderTextColor={'#F5F5F5'}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                onFocus={() => setPasswordError(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: '#fff',
                  backgroundColor: passwordError ? '#CE3E21' : '#621708',
                  width: '100%',
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 8,
                  marginLeft: 10,
                  display: passwordError ? 'flex' : 'none',
                }}
              >
                La contraseña debe ser entre 8 y 20 caracteres, contener letras,
                números y caracteres especiales.
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Confirmar contraseña"
                placeholderTextColor={'#F5F5F5'}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
                onFocus={() => setConfirmPasswordError(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: '#fff',
                  backgroundColor: confirmPasswordError ? '#CE3E21' : '#621708',
                  width: '100%',
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 8,
                  marginLeft: 10,
                  display: confirmPasswordError ? 'flex' : 'none',
                }}
              >
                Las contraseñas no son iguales.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              validate();
            }}
          >
            <View
              style={{
                marginTop: 40,
                paddingVertical: 10,
                backgroundColor: '#0B0A0A',
                width: 200,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Registrar
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('login');
            }}
          >
            <Text
              style={{
                marginTop: 20,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                color: '#D9D9D9',
                fontSize: 10,
                alignSelf: 'flex-end',
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <Image
            source={require('../../../../assets/mono_fondo.png')}
            style={{ width: 160, height: 110 }}
          ></Image>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
