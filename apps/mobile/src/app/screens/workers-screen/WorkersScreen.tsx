import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

/* eslint-disable-next-line */
export interface WorkersScreenProps {}

export function WorkersScreen(props: WorkersScreenProps) {
  const workers = [
    { name: 'Rafael Sanchez' },
    {
      name: 'Luis Fernandez',
    },
    {
      name: 'Alexandra Marquez',
    },
    {
      name: 'Liz Cardenas',
    },
    {
      name: 'Mauricio Delgado',
    },
    { name: 'Rafael Sanchez' },
    {
      name: 'Luis Fernandez',
    },
    {
      name: 'Alexandra Marquez',
    },
    {
      name: 'Liz Cardenas',
    },
    {
      name: 'Mauricio Delgado',
    },
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Meseros</Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <View style={{ height: '90%', marginTop: 50 }}>
        <Text style={{ fontSize: 15, textAlign: 'center' }}>
          {'Seleccione su nombre'}
        </Text>
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 100,
            marginBottom: 100,
            paddingHorizontal: 10,
          }}
        >
          {workers.map((worker, index) => (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 60,
                width: '100%',
                elevation: 1,
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Image
                source={require('../../../../assets/foto_default.webp')}
                style={{
                  width: 60,
                  height: 60,
                  position: 'absolute',
                  objectFit: 'cover',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  zIndex: 1,
                }}
              />
              <TouchableHighlight
                key={index}
                underlayColor={'#F6AA1C'}
                delayPressOut={100}
                onPress={() => console.log('clicka')}
                style={{
                  paddingLeft: 70,
                  paddingHorizontal: 10,
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  {worker.name}
                </Text>
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>
        <Text
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
            fontSize: 10,
            color: '#000',
            textAlign: 'center',
          }}
        >
          Recuerde que al finalizar debe volver a la lista de roles
        </Text>
      </View>
    </View>
  );
}

export default WorkersScreen;
