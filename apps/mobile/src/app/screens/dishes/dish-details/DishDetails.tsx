import React from 'react';

import {
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from 'react-native';

/* eslint-disable-next-line */
export interface DishDetailsProps {}

export function DishDetails(props: DishDetailsProps) {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <TouchableHighlight
          underlayColor={'#F6AA1C'}
          style={{
            position: 'absolute',
            left: 30,
            top: 60,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#FFFFFF',
          }}
          delayPressOut={100}
          onPress={() => {
            console.log('dishes');
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={require('../../../../../assets/arrow_back.png')}
          />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: 30, right: 0 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 30,
          height: '100%',
        }}
      >
        <View
          style={{ backgroundColor: '#e2a0a0', height: '40%', padding: 30 }}
        >
          <Image
            source={require('../../../../../assets/lomo_saltado.png')}
            style={{
              objectFit: 'contain',
              alignSelf: 'center',
              width: 300,
            }}
          />
        </View>
        <View style={{ padding: 30, height: '50%' }}>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Lomo Saltado
            </Text>
            <View
              style={{
                padding: 10,
                backgroundColor: '#FBD8D8',
                borderRadius: 20,
                width: 100,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  textAlign: 'center',
                  color: '#941B0C',
                }}
              >
                S/ 15.00
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              Presenta tiernos trozos de lomo de res salteados a la perfección
              con cebollas, tomates y pimientos, en una mezcla única de sabores
              que incluye toques de ajo, soja y especias cuidadosamente
              seleccionadas. Todo se sirve sobre una cama de arroz al vapor.
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 30,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#5C5C5C',
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#941B0C',
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DishDetails;
