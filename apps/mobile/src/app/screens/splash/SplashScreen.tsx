import { Image, View } from 'react-native';

export const SplashScreen = () => {
  return (
    <View
      style={{
        backgroundColor: '#941B0C',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{
          width: 400,
          height: 400,
          resizeMode: 'contain',
        }}
        source={require('../../../../assets/splash.gif')}
      />
    </View>
  );
};
