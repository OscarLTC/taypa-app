import { AntDesign } from '@expo/vector-icons';
import {
  View,
  TouchableHighlight,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import { ItemsCardCook } from '../../../components/orders/role-items-card/itemsCardCook';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { Order } from '../../../model/order.model';
import { OrderPreparationButton } from '../../../components/orders/OrderPreparationButton';
import { OrderStatusBar } from '../order-status/OrderStatusBar';
import { Statuses } from '../../../model/status.enum';
import { OrderReadyButton } from '../../../components/orders/OrderReadyButton';

interface OrderDetailsCookProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderDetailsCook = (props: OrderDetailsCookProps) => {
  const { order } = props.route.params as { order: Order };

  return (
    <>
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
            {order.table.name}
          </Text>
          <View style={{ position: 'absolute', top: -30, right: -30 }}>
            <Image
              source={require('../../../../../assets/araña_cortada_titulo.png')}
              style={{ width: 175, height: 190 }}
            />
          </View>
        </View>
        <View>
          <OrderStatusBar status={order.status} />
          <View>
            {order.dishes && (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  Platos
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                    display: 'flex',
                  }}
                >
                  {order.dishes?.map((dish, index) => {
                    return (
                      <ItemsCardCook key={index} item={dish} type="dish" />
                    );
                  })}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </View>
      {order.status === Statuses.Nueva && (
        <OrderPreparationButton order={order} status={order.status} />
      )}
      {order.status === Statuses.Preparacion && (
        <OrderReadyButton order={order} status={order.status} />
      )}
    </>
  );
};
