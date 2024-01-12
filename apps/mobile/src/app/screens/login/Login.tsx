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

export interface LoginProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  return (
    <View style={{ backgroundColor: '#FFE8AF', height: '100%' }}>
      <View style={{ marginTop: 32, padding: 30 }}>
        <View style={{ position: 'absolute', top: 150, right: -85 }}>
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
            source={require('../../../../assets/logo.png')}
            style={{ width: 130, height: 100 }}
          ></Image>
          <TextInput
            placeholder="Ingresar correo"
            inputMode="email"
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setError(false)}
            style={{
              marginTop: 80,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#5C5C5C',
              backgroundColor: '#F5F5F5',
              width: '100%',
              borderRadius: 15,
            }}
          />
          <TextInput
            placeholder="Ingresar contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => setError(false)}
            style={{
              marginTop: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#5C5C5C',
              backgroundColor: '#F5F5F5',
              width: '100%',
              borderRadius: 15,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setError(true);
              Keyboard.dismiss();
            }}
          >
            <View
              style={{
                marginTop: 40,
                paddingVertical: 10,
                paddingHorizontal: 60,
                backgroundColor: '#0B0A0A',
                width: '100%',
                borderRadius: 15,
              }}
            >
              <Text style={{ color: 'white' }}>Ingresar</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 20,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
              color: '#BC3908',
              fontSize: 10,
              marginBottom: error ? 0 : 66,
            }}
          >
            ¿Olvidaste tu contraseña?
          </Text>
          <View style={{ marginTop: 35, display: error ? 'flex' : 'none' }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#5C5C5C',
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
        <View style={{ position: 'absolute', bottom: -10, left: -3 }}>
          <Image
            source={require('../../../../assets/mono_fondo.png')}
            style={{ width: 160, height: 110 }}
          ></Image>
        </View>
      </View>
    </View>
  );
}

export default Login;
