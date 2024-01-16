import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface SessionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function Sessions(props: SessionsProps) {
  return (
    <View>
      <Text>Welcome to Sessions!</Text>
    </View>
  );
}

export default Sessions;
