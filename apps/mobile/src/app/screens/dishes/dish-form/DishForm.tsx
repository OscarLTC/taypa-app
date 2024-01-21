import React from 'react';

import { View, Text, Image, TouchableHighlight, TextInput } from 'react-native';

/* eslint-disable-next-line */
export interface DishFormProps {}

export function DishForm(props: DishFormProps) {
  return (
    <>
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
            position: 'relative',
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Registrar Plato
          </Text>
          <View style={{ position: 'absolute', top: -30, right: -30 }}>
            <Image
              source={require('../../../../../assets/araña_cortada_titulo.png')}
              style={{ width: 175, height: 190 }}
            ></Image>
          </View>
        </View>
        <View
          style={{
            marginTop: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: 25,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Nombre
            </Text>
            <TextInput
              maxLength={50}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 10,
                elevation: 1,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Descripción
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 10,
                elevation: 1,
              }}
              textAlignVertical="top"
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Precio
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>
                S/
              </Text>
              <TextInput
                maxLength={5}
                keyboardType="numeric"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  elevation: 1,
                  width: 60,
                }}
                placeholder="00.00"
              />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Imagen
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                gap: 10,
                justifyContent: 'space-between',
              }}
            >
              <View>
                <View
                  style={{
                    backgroundColor: '#00000026',
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require('../../../../../assets/icono_plato.png')}
                    style={{ width: 150, height: 150, borderRadius: 5 }}
                  ></Image>
                </View>
                <Text style={{ fontSize: 8, marginTop: 4 }}>
                  Debe ser en formato PNG
                </Text>
              </View>
              <TouchableHighlight
                style={{
                  backgroundColor: '#F6AA1C',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                  }}
                >
                  Subir imagen
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      <TouchableHighlight
        style={{
          backgroundColor: '#941B0C',
          paddingVertical: 5,
          paddingHorizontal: 15,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          height: 60,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          Registrar
        </Text>
      </TouchableHighlight>
    </>
  );
}

export default DishForm;
