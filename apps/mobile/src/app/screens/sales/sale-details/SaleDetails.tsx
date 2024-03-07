import { Image, Text, TouchableHighlight, View } from 'react-native';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { Order } from '../../../model/order.model';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

interface SaleDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: Route<string>;
}

export const SaleDetails = (props: SaleDetailsProps) => {
  const sale = props.route.params as Order;

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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {sale.table.name}
        </Text>
        <View style={{ position: 'absolute', top: -30, right: -30 }}>
          <Image
            source={require('../../../../../assets/araña_cortada_titulo.png')}
            style={{ width: 175, height: 190 }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#FFFFFF',
          padding: 10,
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View
              style={{
                backgroundColor: '#666e6e',
                borderRadius: 100,
                height: 40,
                width: 40,
                paddingRight: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome name="sign-in" size={20} color="white" />
            </View>
            <Text>Entrada</Text>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              {moment(sale.createdAt.toDate()).format('h:m a')}
            </Text>
          </View>
          <View>
            <View
              style={{
                backgroundColor: '#666e6e',
                borderRadius: 100,
                height: 40,
                width: 40,
                paddingLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome name="sign-out" size={20} color="white" />
            </View>
            <Text>Salida</Text>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              {moment(sale.updatedAt.toDate()).format('h:m a')}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              top: 17,
            }}
          >
            <View
              style={{
                height: 5,
                width: '80%',
                borderRadius: 100,
                backgroundColor: '#666e6e',
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};
