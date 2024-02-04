import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { firestore } from '../../../config/Firebase';
import WorkerCard from '../../../components/workers/WorkerCard';
import { Worker } from '../../../model/woker.model';
import { AntDesign } from '@expo/vector-icons';
import WorkerListSkeleton from '../../../components/workers/WorkerListSkeleton';

export interface WorkerListProps {
  navigation: NavigationProp<ParamListBase>;
}

export function WorkerList(props: WorkerListProps) {
  const [workers, setWorkers] = useState<Worker[]>();

  const getWorkers = async () => {
    const workerCollection = collection(firestore, 'workers');
    const workerSnapshot = await getDocs(workerCollection);
    const workers = workerSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWorkers(workers as Worker[]);
  };

  //para que se actualice la lista de trabajadores cada vez que se entra a la pantalla
  useFocusEffect(
    useCallback(() => {
      getWorkers();
      return;
    }, [])
  );

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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Empleados</Text>
        <TouchableHighlight
          underlayColor={'#941B0C'}
          style={{
            position: 'absolute',
            right: 0,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#E74545',
            zIndex: 1,
            flexDirection: 'row',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          delayPressOut={100}
          onPress={() => {
            props.navigation.navigate('worker-add');
          }}
        >
          <AntDesign name="plus" size={25} color="white" />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      {workers ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 60,
            marginBottom: 30,
            borderRadius: 20,
            flexDirection: 'column',
          }}
        >
          {workers.length > 0 ? (
            workers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                navigation={props.navigation}
              />
            ))
          ) : (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                padding: 20,
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {'Aún no se han\nregistrado trabajadores 🙈'}
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <WorkerListSkeleton />
      )}
    </View>
  );
}

export default WorkerList;
