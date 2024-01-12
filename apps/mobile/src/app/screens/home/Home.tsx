import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { View, Text, Button } from 'react-native';

/* eslint-disable-next-line */
export interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
}

export function Home(props: HomeProps) {
  return (
    <View>
      <Text>Welcome to Home!</Text>
      <Button
        onPress={() => props.navigation.navigate('Login')}
        title="Go to Next Screen"
      />
    </View>
  );
}

export default Home;
