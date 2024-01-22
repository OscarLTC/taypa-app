import { NavigationProp } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { firestore } from '../../../config/Firebase';

/* eslint-disable-next-line */
export interface WorkersListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function WorkersList(props: WorkersListProps) {
  const [workers, setWorkers] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);

  const getWorkers = async () => {
    onSnapshot(collection(firestore, 'workers'), (snapshot) => {
      const updatedWorkersDb: Array<{
        id: string;
        name: string;
        image: string;
      }> = [];
      snapshot.forEach((doc) => {
        updatedWorkersDb.push({
          id: doc.id,
          ...(doc.data() as { name: string; image: string }),
        });
      });
      setWorkers(updatedWorkersDb);
      console.log(updatedWorkersDb);
    });
  };

  useEffect(() => {
    getWorkers();
  }, []);

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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Empleados</Text>
        <TouchableHighlight
          underlayColor={'#941B0C'}
          style={{
            position: 'absolute',
            right: 0,
            padding: 5,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#E74545',
            zIndex: 100,
          }}
          delayPressOut={100}
          onPress={() => {}}
        >
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../../../../assets/plus.png')}
          />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: 60,
          marginBottom: 30,
          borderRadius: 20,
          padding: 10,
          flexDirection: 'column',
        }}
      >
        {workers.length > 0 ? (
          workers.map((worker) => (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 60,
                width: '100%',
                elevation: 1,
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}
              key={worker.id}
            >
              <Image
                source={require('../../../../../assets/foto_default.webp')}
                style={{
                  width: 60,
                  height: 60,
                  position: 'absolute',
                  objectFit: 'cover',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  zIndex: 1,
                }}
              />
              <TouchableHighlight
                underlayColor={'#F6AA1C'}
                delayPressOut={200}
                delayPressIn={100}
                onPress={() => console.log('clicka')}
                style={{
                  paddingLeft: 70,
                  paddingHorizontal: 10,
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  {worker.name}
                </Text>
              </TouchableHighlight>
            </View>
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
    </View>
  );
}

export default WorkersList;
