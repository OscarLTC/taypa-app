import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { OrderAdditionalList } from '../../../components/orders/order-items-list/OrderAdditionalList';
import { AdditionalFilter } from '../../../components/additional/AdditionalFilter';

interface OrderAdditionalProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAdditional = (props: OrderAdditionalProps) => {
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'black',
          }}
        >
          Adicionales
        </Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          />
        </View>
      </View>
      <AdditionalFilter />
      <OrderAdditionalList navigation={props.navigation} />
    </View>
  );
};
