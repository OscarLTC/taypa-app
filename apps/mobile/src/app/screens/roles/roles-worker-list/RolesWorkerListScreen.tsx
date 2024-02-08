import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { RolesWorkerList } from '../../../components/roles/RolesWorkerList';

interface RolesWorkerListScreenProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const RolesWorkerListScreen = (props: RolesWorkerListScreenProps) => {
  const { role } = props.route.params as { role: string };

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
        <TouchableHighlight
          underlayColor={'#F6AA1C'}
          style={{
            position: 'absolute',
            left: 0,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: '#FFFFFF',
            zIndex: 1,
            flexDirection: 'row',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          delayPressOut={100}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableHighlight>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{role}</Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <RolesWorkerList role={role} navigation={props.navigation} />
    </View>
  );
};
