import React from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';

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
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginTop: 100,
          }}
        >
          {workers.map((worker, index) => (
            <TouchableHighlight
              key={index}
              underlayColor={'#F6AA1C'}
              delayPressOut={100}
              onPress={() => console.log('click')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                width: '100%',
                justifyContent: 'center',
                paddingVertical: 15,
                paddingHorizontal: 10,
                elevation: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{worker.name}</Text>
            </TouchableHighlight>
          ))}
        </View>
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
