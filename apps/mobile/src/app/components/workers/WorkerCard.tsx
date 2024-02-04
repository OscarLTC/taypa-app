import React from 'react';

import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Worker } from '../../model/woker.model';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
export interface WorkerCardProps {
  worker: Worker;
  navigation: NavigationProp<ParamListBase>;
}

export function WorkerCard(props: WorkerCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 70,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
      }}
      key={props.worker.id}
    >
      <Image
        source={
          props.worker.image
            ? { uri: props.worker.image }
            : require('../../../../assets/foto_default.webp')
        }
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center',
          marginLeft: 10,
          position: 'absolute',
          objectFit: 'cover',
          borderRadius: 50,
          zIndex: 1,
        }}
      />
      <TouchableHighlight
        underlayColor={'#F6AA1C'}
        delayPressOut={200}
        delayPressIn={100}
        onPress={() =>
          props.navigation?.navigate('worker-details', {
            workerId: props.worker.id,
          })
        }
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
            fontWeight: '500',
            fontSize: 15,
          }}
        >
          {`${props.worker.names} ${props.worker.lastnames}`}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default WorkerCard;
