import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

/* eslint-disable-next-line */
export interface EmailConfirmationScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export function EmailConfirmation(props: EmailConfirmationScreenProps) {
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
              {'Email enviado'}
            </Text>
            <Text
              style={{
                marginTop: 20,
                color: '#fff',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {
                'Revise su correo electrónico, abre el email que le\nhemos enviado y haz clic en el enlace para\nrestablecer su contraseña.'
              }
            </Text>
            <Text
              style={{
                marginTop: 20,
                color: '#BBB3B3',
                fontSize: 10,
                textAlign: 'center',
              }}
            >
              {
                'Revisa tu bandeja de entrada de spam o promociones,\npor si aún no te ha llegado nuestro email.'
              }
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 40,
                paddingVertical: 10,
                paddingHorizontal: 60,
                backgroundColor: '#0B0A0A',
                borderRadius: 15,
              }}
              onPress={() => {
                props.navigation.navigate('sign-in');
              }}
            >
              <Text style={{ color: 'white' }}>Entendido</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity></TouchableOpacity>
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

export default EmailConfirmation;
