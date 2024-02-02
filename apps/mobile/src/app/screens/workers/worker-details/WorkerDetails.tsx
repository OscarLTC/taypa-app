import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';
import { firestore } from '../../../config/Firebase';
import { Worker } from '../../../model/woker.model';

/* eslint-disable-next-line */
export interface WorkerDetailsProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export function WorkerDetails(props: WorkerDetailsProps) {
  const { workerId } = props.route.params as { workerId: string };
  const [worker, setWorker] = useState<Worker>();

  const formRoles = (roles: {
    Cajero: boolean;
    Cocinero: boolean;
    Mesero: boolean;
  }) => {
    const rolesString = Object.keys(roles);
    return rolesString;
  };

  const getWorkerDoc = async () => {
    const workerRef = doc(firestore, 'workers', workerId);
    const workerDoc = await getDoc(workerRef);
    setWorker({
      id: workerDoc.id,
      ...workerDoc.data(),
    } as Worker);
  };

  useEffect(() => {
    getWorkerDoc();
  }, []);

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
        ></View>
        <View>
          <Text>{`${worker?.names} ${worker?.lastnames}`}</Text>
          <View>{/* <Text>{formRoles(worker?.roles)}</Text> */}</View>
        </View>
      </View>
    </View>
  );
}

export default WorkerDetails;
