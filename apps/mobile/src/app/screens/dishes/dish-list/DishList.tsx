import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

/* eslint-disable-next-line */
export interface DishListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function DishList(props: DishListProps) {
  const dishes = [
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Arroz con Pollo',
      price: 15,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Lomo Saltado',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
    },
    {
      image: require('../../../../../assets/lomo_saltado.png'),
      name: 'Seco de Pollo',
      price: 20,
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Platos</Text>
        <TouchableHighlight
          underlayColor={'#941B0C'}
          style={{
            position: 'absolute',
            right: 0,
            padding: 5,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#E74545',
            zIndex: 100,
          }}
          delayPressOut={100}
          onPress={() => {
            props.navigation.navigate('dish-form');
          }}
        >
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../../../../assets/plus.png')}
          />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10, marginTop: 30 }}
        scrollEventThrottle={16}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {dishes.map((dish, index) => {
            return (
              <TouchableOpacity
                delayPressIn={100}
                delayPressOut={100}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '45%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 15,
                  marginBottom: 20,
                  padding: 10,
                }}
                key={index}
              >
                <Image
                  source={dish.image}
                  style={{
                    width: '100%',
                    height: 100,
                    objectFit: 'contain',
                  }}
                ></Image>
                <View
                  style={{
                    width: '100%',
                    paddingTop: 10,
                    borderTopColor: '#f2f2f2',
                    borderTopWidth: 1,
                    paddingHorizontal: 5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      overflow: 'hidden',
                      fontSize: 12,
                    }}
                  >
                    {dish.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#941B0C',
                    }}
                  >
                    S/{dish.price.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <TouchableHighlight
                    underlayColor={'#F6AA1C'}
                    style={{
                      padding: 8,
                      backgroundColor: '#941B0C',
                      borderBottomRightRadius: 15,
                      borderTopLeftRadius: 15,
                    }}
                    delayPressOut={100}
                    onPress={() => {
                      console.log('dishes');
                    }}
                  >
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                      }}
                      source={require('../../../../../assets/tash_blanco.png')}
                    />
                  </TouchableHighlight>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default DishList;
