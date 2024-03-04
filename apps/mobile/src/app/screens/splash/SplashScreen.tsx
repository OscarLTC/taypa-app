import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const SplashScreen = (props: SplashScreenProps) => {
  const redirectValue = useRecoilValue(userState);

  useEffect(() => {
    const user = redirectValue;

    console.log(user);

    if (user !== undefined) {
      let redirect = 'splash';

      if (user?.isLocked) {
        redirect = 'roles';
      } else if (user?.isSignedIn) {
        redirect = 'home';
      } else {
        redirect = 'auth';
      }

      setTimeout(() => {
        props.navigation.navigate(redirect);
      }, 1500);
    }
  }, [redirectValue, props.navigation]);

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
