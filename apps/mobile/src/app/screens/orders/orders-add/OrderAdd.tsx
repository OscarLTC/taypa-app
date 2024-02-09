import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { OrderAddDishes } from '../../../components/orders/OrderAddDishes';
import { Table } from '../../../model/table.model';

interface OrderAddProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAdd = (props: OrderAddProps) => {
  const { table } = props.route.params as { table: Table };
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{table?.name}</Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 10,
        }}
      >
        <OrderAddDishes navigation={props.navigation} />
      </View>
    </View>
  );
};
