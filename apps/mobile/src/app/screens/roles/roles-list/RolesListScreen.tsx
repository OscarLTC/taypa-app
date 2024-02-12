import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { UnlockViewModal } from '../../../components/home/UnlockViewModal';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { userLockedState } from '../../../storage/userLocked/userLocked.atom';

interface RolesScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const RolesListScreen = (props: RolesScreenProps) => {
  const roles = [
    {
      name: 'Mesero',
      image: require('../../../../../assets/mesero_rol.png'),
    },
    {
      name: 'Cocinero',
      image: require('../../../../../assets/cocinero_rol.png'),
    },
    {
      name: 'Cajero',
      image: require('../../../../../assets/cajero_rol.png'),
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const refreshUserLocked = useRecoilRefresher_UNSTABLE(userLockedState);
  const [userLocked, setUserLocked] = useRecoilState(userLockedState);

  useEffect(() => {
    refreshUserLocked();
  });

  return (
    <View
      style={{
        padding: 30,
        height: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <Image
          source={require('../../../../../assets/araña_cortada_titulo.png')}
          style={{ width: 175, height: 190 }}
        ></Image>
      </View>
      <View style={{ position: 'absolute', top: 30, left: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {'Bienvenido,\nseleccione su rol'}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {roles.map((role, index) => (
            <TouchableHighlight
              key={index}
              underlayColor={'#F6AA1C'}
              delayPressOut={100}
              onPress={() => {
                setUserLocked({
                  ...userLocked,
                  role: role.name,
                });
                props.navigation.navigate('roles-worker-list', {
                  role: role.name,
                });
              }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                width: '100%',
                justifyContent: 'center',
                elevation: 1,
              }}
            >
              <View style={{ overflow: 'hidden' }}>
                <Image
                  source={role.image}
                  style={{
                    width: 75,
                    height: 75,
                    position: 'absolute',
                    left: 10,
                    bottom: -9,
                  }}
                ></Image>
                <Text
                  style={{
                    fontSize: 15,
                    marginVertical: 30,
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {role.name}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#941B0C',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 70,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
          >
            Debloquear
          </Text>
        </TouchableOpacity>
      </View>
      <UnlockViewModal
        modalVisible={modalVisible}
        navigation={props.navigation}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default RolesListScreen;
