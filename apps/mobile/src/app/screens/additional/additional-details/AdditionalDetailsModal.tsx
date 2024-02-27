import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';

import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Item } from '../../../model/item.model';

interface AdditionalDetailsProps {
  item: Item;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<ParamListBase>;
}

export const AdditionalDetailsModal = (props: AdditionalDetailsProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            elevation: 5,
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#e2a0a0',
              paddingVertical: 5,
              paddingHorizontal: 30,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Image
              source={
                props.item.image.url
                  ? { uri: props.item.image.url }
                  : require('../../../../../assets/lomo_saltado.png')
              }
              style={{
                width: 250,
                height: 200,
                objectFit: 'contain',
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 30,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {props.item.name}
              </Text>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#FBD8D8',
                  borderRadius: 20,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#941B0C',
                  }}
                >
                  S/ {Number(props.item?.price).toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 30,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  elevation: 2,
                  backgroundColor: '#5C5C5C',
                }}
                onPress={() => props.setModalVisible(!props.modalVisible)}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  {
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    elevation: 2,
                    backgroundColor: '#941B0C',
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate('additional-edit', {
                    additionalId: props.item.id,
                  });
                  props.setModalVisible(!props.modalVisible);
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Actualizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
