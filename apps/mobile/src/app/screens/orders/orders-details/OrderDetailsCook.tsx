import { AntDesign } from '@expo/vector-icons';
import {
  View,
  TouchableHighlight,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import { Order } from '../../../model/order.model';
import { OrderPreparationButton } from '../../../components/orders/order-buttons/OrderPreparationButton';
import { OrderStatusBar } from '../order-status/OrderStatusBar';
import { Statuses } from '../../../model/status.enum';
import { OrderReadyButton } from '../../../components/orders/order-buttons/OrderReadyButton';
import { ItemListCook } from '../../../components/orders/order-items-list/ItemListCook';

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 20,
          }}
        >
          <OrderStatusBar status={order.status} />
          <View>
            {order.dishes && order.dishes.length > 0 && (
              <ItemListCook items={order.dishes} title="Platos" />
            )}
            {order.drinks && order.drinks.length > 0 && (
              <ItemListCook items={order.drinks} title="Bebidas" />
            )}
            {order.additional && order.additional.length > 0 && (
              <ItemListCook items={order.additional} title="Adicionales" />
            )}
          </View>
          {order.note && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Nota:
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#626262',
                  fontSize: 12,
                }}
              >
                {order.note}
              </Text>
            </View>
          )}
        </ScrollView>
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
