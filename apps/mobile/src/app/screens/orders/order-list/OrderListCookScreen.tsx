import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Image, Platform, Text, TouchableHighlight, View } from 'react-native';
import { OrderListCook } from '../../../components/orders/order-list/OrderListCook';

interface OrderListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderListCookScreen = (props: OrderListScreenProps) => {
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ordenes</Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          />
        </View>
      </View>
      <OrderListCook navigation={props.navigation} />
      <View
        //@ts-expect-error - web style
        style={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          bottom: 20,
          right: 30,
          backgroundColor: 'white',
          borderRadius: 100,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
      >
        <FontAwesome5 name="question" size={25} color="gray" />
      </View>
    </View>
  );
};
