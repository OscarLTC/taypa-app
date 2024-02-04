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
} from 'react-native';
import { Worker } from '../../../model/woker.model';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../../config/Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../storage/user/user.atom';

export interface WorkerAddProps {
  navigation: NavigationProp<ParamListBase>;
}

export function WorkerAdd(props: WorkerAddProps) {
  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Worker>();
  const roles = ['Mesero', 'Cocinero', 'Cajero'];

  const [imageAsset, setImageAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const userData = useRecoilValue(userState);

  const onLoadImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
      clearErrors('image');
    }
  };

  const addWorker = async (worker: Worker) => {
    const imageUrl = await uploadImageToFirebae();
    addDoc(collection(firestore, 'workers'), {
      ...worker,
      image: imageUrl,
    }).then(() => {
      props.navigation.goBack();
    });
  };

  const uploadImageToFirebae = async () => {
    const imageName = imageAsset?.uri.split('/').pop();

    const fetchResponse = await fetch(imageAsset?.uri ?? '');
    const imageBlob = await fetchResponse.blob();
    const storageRef = ref(storage, `workers/${userData?.userId}/${imageName}`);

    const snapshot = await uploadBytesResumable(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
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

    if (!imageAsset) {
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
                        const newRoles = getValues('roles');
                        newRoles[index] = !newRoles[index] ? role : '';
                        setValue('roles', newRoles);
                        clearErrors('roles');
                      }}
                      style={{
                        backgroundColor: value ? '#F6AA1C' : '#FFFFFF',
                        padding: 15,
                        borderRadius: 10,
                        elevation: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: value ? '#FFFFFF' : '#5C5C5C',
                        }}
                      >
                        {role}
                      </Text>
                    </TouchableOpacity>
                  )}
                  name={`roles.${index}`}
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
                    backgroundColor: imageAsset ? '#FFF' : '#00000026',
                    borderRadius: 10,
                    borderWidth: errors.image ? 1 : 0,
                    borderColor: errors.image ? '#CE3E21' : 'transparent',
                  }}
                >
                  <Image
                    source={
                      imageAsset
                        ? { uri: imageAsset.uri }
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
}

export default WorkerAdd;
