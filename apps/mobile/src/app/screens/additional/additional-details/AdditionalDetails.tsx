import {
  NavigationProp,
  ParamListBase,
  Route,
  useIsFocused,
} from '@react-navigation/native';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useState, useEffect } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { firestore, storage } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';

interface AdditionalDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const AdditionalDetails = (props: AdditionalDetailsProps) => {
  const { additionalId } = props.route.params as { additionalId: string };
  const [additional, setAdditional] = useState<Item>();
  const isAdditionalDetailsFocused = useIsFocused();

  const getAdditionalDoc = async () => {
    const additionalRef = doc(firestore, 'additional', additionalId || '');
    await getDoc(additionalRef).then((additionalDoc) => {
      setAdditional({
        id: additionalDoc.id,
        ...additionalDoc.data(),
      } as Item);
    });
  };

  const deteleAdditionalImage = async () => {
    const imageRef = ref(
      storage,
      `additional/${additional?.adminId}/${additional?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteAdditional = async () => {
    const additionalRef = doc(firestore, 'additional', additionalId);
    await deleteDoc(additionalRef);
    props.navigation.goBack();
    await deteleAdditionalImage();
  };

  useEffect(() => {
    if (isAdditionalDetailsFocused) {
      getAdditionalDoc();
    }
  }, [isAdditionalDetailsFocused]);
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
            top: 30,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#FFFFFF',
          }}
          delayPressOut={100}
          onPress={() => {
            props.navigation.goBack();
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
        <View style={{ position: 'absolute', right: 0 }}>
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
          height: '100%',
        }}
      >
        <View
          style={{ backgroundColor: '#e2a0a0', height: '40%', padding: 30 }}
        >
          <Image
            source={{
              uri: additional?.image.url,
            }}
            style={{
              objectFit: 'contain',
              alignSelf: 'center',
              width: 300,
              height: 300,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ padding: 30, height: '50%' }}>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {additional?.name}
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
                  fontSize: 13,
                  textAlign: 'center',
                  color: '#941B0C',
                }}
              >
                S/ {Number(additional?.price).toFixed(2)}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              {additional?.description}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#5C5C5C',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={deleteAdditional}
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
          onPress={() => {
            props.navigation.navigate('additional-edit', {
              additionalId,
            });
          }}
        >
          <Text style={{ color: '#FFFFFF' }}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
