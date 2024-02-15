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
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { firestore, storage } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';

interface DrinkDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const DrinkDetails = (props: DrinkDetailsProps) => {
  const { drinkId } = props.route.params as { drinkId: string };
  const [drink, setDrink] = useState<Item>();
  const isDrinkDetailsFocused = useIsFocused();

  const getDrinkDoc = async () => {
    const drinkRef = doc(firestore, 'drinks', drinkId || '');
    await getDoc(drinkRef).then((drinkDoc) => {
      setDrink({
        id: drinkDoc.id,
        ...drinkDoc.data(),
      } as Item);
    });
  };

  const deteleDrinkImage = async () => {
    const imageRef = ref(
      storage,
      `drinks/${drink?.adminId}/${drink?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteDrink = async () => {
    const drinkRef = doc(firestore, 'drinks', drinkId);
    await deleteDoc(drinkRef);
    props.navigation.goBack();
    await deteleDrinkImage();
  };

  useEffect(() => {
    if (isDrinkDetailsFocused) {
      getDrinkDoc();
    }
  }, [isDrinkDetailsFocused]);
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
              uri: drink?.image.url,
            }}
            style={{
              objectFit: 'contain',
              alignSelf: 'center',
              width: 300,
              height: 300,
            }}
          />
        </View>
        <View style={{ padding: 30, height: '50%' }}>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {drink?.name}
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
                S/ {Number(drink?.price).toFixed(2)}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              {drink?.description}
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
              onPress={deleteDrink}
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
                props.navigation.navigate('drink-edit', {
                  drinkId,
                });
              }}
            >
              <Text style={{ color: '#FFFFFF' }}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
