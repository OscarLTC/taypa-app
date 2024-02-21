import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  BackHandler,
  Platform,
} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MainManagementCard } from '../../components/home/MainManagementCard';
import { LockViewModal } from '../../components/home/LockViewModal';
import { useEffect, useState } from 'react';
import { SignOutModal } from '../../components/home/SignOutModal';

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export const HomeScreen = (props: HomeProps) => {
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
  ];

  const [modalLockVisible, setModalLockVisible] = useState(false);
  const [modalSignOutVisible, setModalSignOutVisible] = useState(false);

  const isRolesFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        return isRolesFocused;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }, [isRolesFocused]);

  return (
    <View
      style={{
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
            paddingLeft: 5,
            justifyContent: 'center',

            alignItems: 'center',
          }}
          delayPressOut={100}
          onPress={() => setModalSignOutVisible(true)}
        >
          <Entypo name="log-out" size={20} color="white" />
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
        <MainManagementCard navigation={props.navigation} />
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
            onPress={() => setModalLockVisible(true)}
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
      <SignOutModal
        navigation={props.navigation}
        modalVisible={modalSignOutVisible}
        setModalVisible={(modalVisible) => setModalSignOutVisible(modalVisible)}
      />
      <LockViewModal
        navigation={props.navigation}
        modalVisible={modalLockVisible}
        setModalVisible={(modalVisible) => setModalLockVisible(modalVisible)}
      />
    </View>
  );
};

export default HomeScreen;
