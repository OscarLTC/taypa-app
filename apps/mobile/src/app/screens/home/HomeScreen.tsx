import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { View, Text, Image, TouchableHighlight } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase';
import { useResetRecoilState } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MainManagementCard } from '../../components/home/MainManagementCard';

/* eslint-disable-next-line */
export interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export function HomeScreen(props: HomeProps) {
  const featuresData = [
    {
      title: 'Gestión de Mesas',
      icon: <Fontisto name="nav-icon-grid" size={20} color="black" />,
      redirect: 'tables',
    },
    {
      title: 'Gestión de Empleados',
      icon: <FontAwesome name="group" size={20} color="black" />,
      redirect: 'workers',
    },
    {
      title: 'Historial de Ventas',
      icon: <FontAwesome5 name="coins" size={20} color="black" />,
      redirect: 'sales',
    },
    {
      title: 'Sesiones',
      icon: <Fontisto name="eye" size={17} color="black" />,
      redirect: 'sessions',
    },
  ];
  const resetUser = useResetRecoilState(userState);

  const onSignOutPress = () => {
    props.navigation.navigate('sign-in');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resetUser();
      }
    });
  };

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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Accesos</Text>
        <TouchableHighlight
          underlayColor={'#F6AA1C'}
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
          onPress={onSignOutPress}
        >
          <FontAwesome name="user" size={25} color="white" />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <View
        style={{
          marginTop: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <MainManagementCard />
        <View
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {featuresData.map((feature, index) => (
            <TouchableHighlight
              key={index}
              underlayColor={'#F6AA1C'}
              delayPressOut={100}
              onPress={() => props.navigation.navigate(feature.redirect)}
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 30,
              }}
            >
              <>
                {feature.icon}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  {feature.title}
                </Text>
              </>
            </TouchableHighlight>
          ))}
          <TouchableHighlight
            underlayColor={'#F6AA1C'}
            delayPressOut={100}
            onPress={() => console.log('click')}
            style={{
              backgroundColor: '#890303',
              paddingVertical: 20,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              gap: 30,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              Bloqueo a Vista Administrativa
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
