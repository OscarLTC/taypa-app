import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { userRedirect } from '../../storage/user/user.selector';
import { useRecoilValue } from 'recoil';

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const redirectValue = useRecoilValue(userRedirect);

  useEffect(() => {
    const redirect = redirectValue;
    setTimeout(() => {
      props.navigation.navigate(redirect);
    }, 1500);
  }, [redirectValue]);

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
