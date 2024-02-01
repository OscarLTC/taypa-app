import React from 'react';

import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Worker } from '../../model/woker.model';

/* eslint-disable-next-line */
export interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard(props: WorkerCardProps) {
  return (
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
      key={props.worker.id}
    >
      <Image
        source={require('../../../../assets/foto_default.webp')}
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
          {props.worker.names}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default WorkerCard;
