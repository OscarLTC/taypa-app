import { AntDesign } from '@expo/vector-icons';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AdditionalList } from '../../../components/additional/AdditionalList';
import { AdditionalFilter } from '../../../components/additional/AdditionalFilter';

interface AdditionalListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const AdditionalListScreen = (props: AdditionalListProps) => {
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
          position: 'relative',
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Adicionales</Text>
        <TouchableHighlight
          underlayColor={'#941B0C'}
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
          onPress={() => {
            props.navigation.navigate('additional-add');
          }}
        >
          <AntDesign name="plus" size={25} color="white" />
        </TouchableHighlight>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          ></Image>
        </View>
      </View>
      <AdditionalFilter />
      <AdditionalList navigation={props.navigation} />
    </View>
  );
};
