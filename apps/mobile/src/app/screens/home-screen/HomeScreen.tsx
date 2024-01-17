import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';

/* eslint-disable-next-line */
export interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function HomeScreen(props: HomeProps) {
  const functions = [
    'Gestión de Platos',
    'Gestión de Bebidas',
    'Gestión de Adicionales',
    'Gestión de Mesas',
    'Historial de Ventas',
    'Listado de Sesiones',
    'Bloqueo de Vista Simplificada',
    'Manejo de Perfil',
  ];

  return (
    <View
      style={{
        marginTop: 30,
        padding: 30,
        height: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableHighlight
          underlayColor={'#F6AA1C'}
          style={{
            position: 'absolute',
            left: 0,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#FFFFFF',
          }}
          delayPressOut={100}
          onPress={() => console.log('asd')}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={require('../../../../assets/arrow_back.png')}
          />
        </TouchableHighlight>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Accesos</Text>
      </View>
      <View
        style={{
          marginTop: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {functions.map((f, index) => (
          <TouchableHighlight
            underlayColor={'#F6AA1C'}
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            delayPressOut={100}
            onPress={() => console.log('asd')}
            key={index}
          >
            <Text style={{ fontSize: 18 }}>{f}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

export default HomeScreen;
