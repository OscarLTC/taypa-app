import {
  NavigationProp,
  ParamListBase,
  Route,
  useFocusEffect,
} from '@react-navigation/native';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';
import { firestore, storage } from '../../../config/Firebase';
import { Worker } from '../../../model/woker.model';
import { deleteObject, ref } from 'firebase/storage';

interface WorkerDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export function WorkerDetails(props: WorkerDetailsProps) {
  const { workerId } = props.route.params as { workerId: string };
  const [worker, setWorker] = useState<Worker>();

  const getWorkerDoc = async () => {
    const workerRef = doc(firestore, 'workers', workerId);
    const workerDoc = await getDoc(workerRef);
    setWorker({
      id: workerDoc.id,
      ...workerDoc.data(),
    } as Worker);
  };

  const deteleWorkerImage = async () => {
    const imageRef = ref(
      storage,
      `workers/${worker?.adminId}/${worker?.image.name}`
    );
    await deleteObject(imageRef);
  };

  const deleteWorker = async () => {
    const workerRef = doc(firestore, 'workers', workerId);
    await deleteDoc(workerRef);
    props.navigation.goBack();
    await deteleWorkerImage();
  };

  useFocusEffect(() => {
    getWorkerDoc();
  });

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
            top: 60,
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
        <View style={{ position: 'absolute', top: 30, right: 0 }}>
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
          marginTop: 30,
          height: '100%',
        }}
      >
        <View
          style={{
            height: '65%',
            backgroundColor: '#FFDB97',
          }}
        >
          <View
            style={{
              height: '100%',
              backgroundColor: '#FFDB97',
              justifyContent: 'flex-end',
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={{ uri: worker?.image?.url }}
              style={{
                width: '100%',
                height: '70%',
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 40,
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '30%',
          }}
        >
          <Text
            style={{ fontWeight: '500', fontSize: 19 }}
          >{`${worker?.names} ${worker?.lastnames}`}</Text>
          <View style={{}}>
            <Text style={{ fontWeight: '500', color: '#777676', fontSize: 12 }}>
              Roles
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              {worker?.roles?.sort().map((role, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#FFC4BD',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    marginTop: 10,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: '#890303',
                      fontWeight: '500',
                      fontSize: 14,
                    }}
                  >
                    {role}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableHighlight
              underlayColor={'#F6AA1C'}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: '#5C5C5C',
              }}
              delayPressOut={100}
              onPress={deleteWorker}
            >
              <Text style={{ color: '#fff' }}>Eliminar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'#F6AA1C'}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: '#941B0C',
              }}
              delayPressOut={100}
              onPress={() => {
                props.navigation.navigate('worker-edit', {
                  workerId: workerId,
                });
              }}
            >
              <Text style={{ color: '#fff' }}>Actualizar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WorkerDetails;
