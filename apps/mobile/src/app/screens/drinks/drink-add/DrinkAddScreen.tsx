import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Keyboard,
  View,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  Platform,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { firestore, storage } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';

interface DrinkAddProps {
  navigation: NavigationProp<ParamListBase>;
}

export const DrinkAdd = (props: DrinkAddProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<Item>();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useRecoilValue(userState);

  const onLoadImagePress = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setValue('image', {
        name: result.assets[0].uri.split('/').pop() ?? '',
        url: result.assets[0].uri,
      });
      clearErrors('image');
    }
  };

  const addDrink = async (drink: Item) => {
    setIsLoading(true);
    const imageUrl = await uploadImageToFirebae();
    addDoc(collection(firestore, 'drinks'), {
      ...drink,
      image: imageUrl,
    }).then(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Bebida registrada',
        text2: `${watch('name')} se ha registrado correctamente`,
        position: 'bottom',
        visibilityTime: 3000,
      });
      props.navigation.navigate('drink-list');
    });
  };

  const uploadImageToFirebae = async () => {
    const imageName = watch('image.name');

    const fetchResponse = await fetch(watch('image.url'));
    const imageBlob = await fetchResponse.blob();
    const storageRef = ref(storage, `drinks/${userData?.userId}/${imageName}`);

    const snapshot = await uploadBytesResumable(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      name: imageName,
    };
  };

  const onSubmitPress: SubmitHandler<Item> = (data) => {
    Keyboard.dismiss();

    if (!watch('image')) {
      setError('image', { type: 'manual', message: 'Debe subir una imagen' });
      return;
    }

    addDrink({
      ...data,
      name: data.name.trim(),
      adminId: userData?.userId ?? '',
      price: data.price,
    });
  };
  return (
    <>
      <View
        style={{
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
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#FFFFFF',
              zIndex: 1,
              flexDirection: 'row',
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            delayPressOut={100}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableHighlight>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Registrar Bebida
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
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  maxLength={50}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: errors.name ? '#CE3E21' : '#FFFFFF',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              rules={{
                required: 'Este campo es requerido',
                maxLength: {
                  value: 50,
                  message: 'El nombre no puede tener más de 50 caracteres',
                },
              }}
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
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    maxLength={5}
                    inputMode="numeric"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      elevation: 1,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      borderWidth: 1,
                      borderColor: errors.price ? '#CE3E21' : '#FFFFFF',
                      width: 60,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                    placeholder="00.00"
                  />
                )}
                name="price"
                rules={{
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: 'Ingrese un precio válido',
                  },
                }}
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
                    backgroundColor: watch('image') ? '#FFF' : '#00000026',
                    borderRadius: 10,
                    borderWidth: errors.image ? 1 : 0,
                    borderColor: errors.image ? '#CE3E21' : 'transparent',
                  }}
                >
                  <Image
                    source={
                      watch('image')
                        ? { uri: watch('image.url') }
                        : require('../../../../../assets/drink.png')
                    }
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 10,
                      objectFit: 'contain',
                    }}
                    resizeMode="contain"
                  />
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
                onPress={onLoadImagePress}
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
        disabled={isLoading}
        // @ts-expect-error position is not available in web
        style={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          backgroundColor: '#941B0C',
          paddingVertical: 5,
          paddingHorizontal: 15,
          width: '100%',
          bottom: 0,
          height: 60,
          alignSelf: 'center',
          justifyContent: 'center',
          opacity: isLoading ? 0.5 : 1,
        }}
        onPress={handleSubmit(onSubmitPress)}
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
};
