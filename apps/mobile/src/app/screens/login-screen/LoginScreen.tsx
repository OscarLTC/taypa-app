import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/Firebase';

export interface LoginProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function LoginScreen(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        //TODO: Revisar los parametros que se guardan en la base de datos
        props.navigation.navigate('home');
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
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
          <Image
            source={require('../../../../assets/logo_blanco.png')}
            style={{ width: 130, height: 100 }}
          ></Image>
          <TextInput
            placeholder="Ingresar correo"
            placeholderTextColor={'#F5F5F5'}
            inputMode="email"
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setError(false)}
            style={{
              marginTop: 80,
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: '#fff',
              backgroundColor: error ? '#CE3E21' : '#621708',
              width: '100%',
              borderRadius: 15,
            }}
          />

          <TextInput
            placeholder="Ingresar contraseña"
            placeholderTextColor={'#F5F5F5'}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => {
              setError(false);
            }}
            style={{
              marginTop: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: '#fff',
              backgroundColor: error ? '#CE3E21' : '#621708',
              width: '100%',
              borderRadius: 15,
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              width: '100%',
            }}
            onPress={() => {
              props.navigation.navigate('recover');
            }}
          >
            <Text
              style={{
                marginTop: 5,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                color: '#D9D9D9',
                fontSize: 10,
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              login();
              Keyboard.dismiss();
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
                Ingresar
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('register');
            }}
          >
            <View
              style={{
                marginTop: 10,
                paddingVertical: 10,
                backgroundColor: 'trasparent',
                borderColor: 'white',
                borderWidth: 1,
                width: 200,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Registrarse
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              display: error ? 'flex' : 'none',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: 11,
                textAlign: 'center',
              }}
            >
              {
                'Correo o contraseña incorrecta.\n Por favor, vuelva a intentarlo'
              }
            </Text>
          </View>
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

export default LoginScreen;
