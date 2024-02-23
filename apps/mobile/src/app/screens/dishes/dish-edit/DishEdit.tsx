import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { firestore, storage } from '../../../config/Firebase';
import { Item } from '../../../model/item.model';
import { userState } from '../../../storage/user/user.atom';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';

interface DishEditProps {
  navigation: NavigationProp<ParamListBase>;
  route: Route<string>;
}

export const DishEdit = (props: DishEditProps) => {
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
  const { dishId } = props.route.params as { dishId: string };
  const userData = useRecoilValue(userState);

  const onLoadImagePress = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      deteleDishImage();
      setValue('image', {
        name: result.assets[0].uri.split('/').pop() ?? '',
        url: result.assets[0].uri,
      });
      clearErrors('image');
    }
  };

  const deteleDishImage = async () => {
    const imageRef = ref(
      storage,
      `dishes/${watch('adminId')}/${watch('image.name')}`
    );
    await deleteObject(imageRef);
  };

  const updateDish = async (dish: Item) => {
    setIsLoading(true);
    let imageUrl = dish.image;
    if (dish.image.url.startsWith('file://')) {
      imageUrl = await uploadImageToFirebae();
    }
    updateDoc(doc(firestore, 'dishes', dishId), {
      ...dish,
      image: imageUrl,
    }).then(() => {
      setIsLoading(false);
      props.navigation.goBack();
    });
  };

  const uploadImageToFirebae = async () => {
    const imageName = watch('image.name');

    const fetchResponse = await fetch(watch('image.url'));
    const imageBlob = await fetchResponse.blob();
    const storageRef = ref(storage, `workers/${userData?.userId}/${imageName}`);

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

    updateDish({
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      adminId: userData?.userId ?? '',
      price: data.price,
    });
  };

  const getDishDoc = async () => {
    const dishRef = doc(firestore, 'dishes', dishId);
    const dishDoc = await getDoc(dishRef);
    if (dishDoc.exists()) {
      const data = dishDoc.data();
      for (const [key, value] of Object.entries(data)) {
        setValue(key as keyof Item, value);
      }
    } else {
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    getDishDoc();
  }, []);

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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Actualizar Plato
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
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: 'El nombre solo puede contener letras y números',
                },
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Descripción
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
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
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textAlignVertical="top"
                />
              )}
              name="description"
              defaultValue=""
              rules={{
                maxLength: {
                  value: 200,
                  message:
                    'La descripción no puede tener más de 200 caracteres',
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
                        : require('../../../../../assets/icono_plato.png')
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
          Actualizar
        </Text>
      </TouchableHighlight>
    </>
  );
};
