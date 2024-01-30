import { NavigationProp, ParamListBase } from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase';

/* eslint-disable-next-line */
export interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export function HomeScreen(props: HomeProps) {
  const featuresData = [
    {
      title: 'Gestión de Mesas',
      image: require('../../../../assets/cuadricula.png'),
      redirect: 'tables',
    },
    {
      title: 'Gestión de Empleados',
      image: require('../../../../assets/usuarios_alt.png'),
      redirect: 'workers',
    },
    {
      title: 'Historial de Ventas',
      image: require('../../../../assets/monedas.png'),
      redirect: 'sales',
    },
    {
      title: 'Sesiones',
      image: require('../../../../assets/ojo.png'),
      redirect: 'sessions',
    },
  ];

  //TODO: No esta funcionando setUser
  // const setUser = useSetRecoilState(userState);

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');
    } catch (error) {
      console.log(error);
    }
  };

  const onSignOutPress = () => {
    props.navigation.navigate('auth', { screen: 'sign-in' });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearAllData();
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
            padding: 10,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#E74545',
            zIndex: 1,
          }}
          delayPressOut={100}
          onPress={onSignOutPress}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={require('../../../../assets/usuario.png')}
          />
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#D61717',
              padding: 5,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              height: 120,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              Gestión de Platos
            </Text>
            <Image
              style={{
                position: 'absolute',
                bottom: -20,
                left: 20,
                width: 150,
                height: 100,
                objectFit: 'contain',
              }}
              source={require('../../../../assets/lomo_saltado.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#EF4242',
              padding: 5,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              height: 120,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              Gestión de Bebidas
            </Text>
            <Image
              style={{
                position: 'absolute',
                bottom: -20,
                left: 20,
                width: 150,
                height: 100,
                objectFit: 'contain',
              }}
              source={require('../../../../assets/bebida.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FE8282',
              padding: 5,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              height: 120,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              Gestión de Adicionales
            </Text>
            <Image
              style={{
                position: 'absolute',
                bottom: -20,
                left: 30,
                width: 150,
                height: 100,
                objectFit: 'contain',
              }}
              source={require('../../../../assets/adicional.png')}
            />
          </TouchableOpacity>
        </View>
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
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={feature.image}
                />
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
