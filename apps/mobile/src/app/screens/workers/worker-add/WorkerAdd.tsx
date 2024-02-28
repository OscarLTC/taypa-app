import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { Worker } from '../../../model/woker.model';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { firestore, storage } from '../../../config/Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../storage/user/user.atom';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';

interface WorkerAddProps {
  navigation: NavigationProp<ParamListBase>;
}

export const WorkerAdd = (props: WorkerAddProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<Worker>();
  const roles = ['Cajero', 'Cocinero', 'Mesero'];
  const [isLoading, setIsLoading] = useState(false);

  const userData = useRecoilValue(userState);

  const onLoadImagePress = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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

  const addWorker = async (worker: Worker) => {
    setIsLoading(true);
    const imageUrl = await uploadImageToFirebae();
    addDoc(collection(firestore, 'workers'), {
      ...worker,
      isAvailable: true,
      image: imageUrl,
    }).then(() => {
      setIsLoading(false);
      props.navigation.navigate('worker-list');
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

  const onSubmitPress: SubmitHandler<Worker> = (data) => {
    Keyboard.dismiss();

    const selectedRoles = data.roles.filter(
      (role) => role !== '' && role !== undefined
    );

    if (selectedRoles.length === 0) {
      setError('roles', {
        type: 'manual',
        message: 'Debe seleccionar al menos un rol',
      });
      return;
    }

    if (!watch('image')) {
      setError('image', { type: 'manual', message: 'Debe subir una imagen' });
      return;
    }

    addWorker({
      ...data,
      names: data.names.trim(),
      lastnames: data.lastnames.trim(),
      adminId: userData?.userId ?? '',
      roles: selectedRoles,
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
            Registrar Empleado
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
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Nombres
            </Text>
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Nombre requerido',
                  value: true,
                },
                pattern: {
                  message: 'Nombre inválido',
                  value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('names');
                  }}
                  value={value}
                  maxLength={15}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: errors.names ? '#CE3E21' : '#FFFFFF',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                />
              )}
              name="names"
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Apellidos
            </Text>
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Apellido requerido',
                  value: true,
                },
                pattern: {
                  message: 'Apellido inválido',
                  value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onFocus={() => {
                    clearErrors('lastnames');
                  }}
                  value={value}
                  maxLength={15}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: errors.lastnames ? '#CE3E21' : '#FFFFFF',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                />
              )}
              name="lastnames"
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              <Text style={{ color: '#E74545' }}>{'* '}</Text>Roles
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 20,
                justifyContent: 'space-between',
                borderColor: errors.roles ? '#CE3E21' : 'transparent',
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
              }}
            >
              {roles.map((role, index) => (
                <Controller
                  key={index}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (value?.includes(role)) {
                          onChange(value?.filter((item) => item !== role));
                        } else {
                          onChange([...(value ?? []), role]);
                        }
                      }}
                      style={{
                        backgroundColor: value?.includes(role)
                          ? '#F6AA1C'
                          : '#FFFFFF',
                        padding: 15,
                        borderRadius: 10,
                        elevation: 2,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: value?.includes(role) ? '#FFFFFF' : '#5C5C5C',
                        }}
                      >
                        {role}
                      </Text>
                    </TouchableOpacity>
                  )}
                  name={`roles`}
                />
              ))}
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
                        : require('../../../../../assets/usuario.png')
                    }
                    style={{ width: 150, height: 150, borderRadius: 10 }}
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

export default WorkerAdd;
