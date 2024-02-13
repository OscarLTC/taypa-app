import { Text, TouchableOpacity, View } from 'react-native';
import { Order } from '../../../model/order.model';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface OrderCardCookProps {
  navigation: NavigationProp<ParamListBase>;
  order: Order;
}

export const OrderCardCook = (props: OrderCardCookProps) => {
  const orderDishesQuantity = props.order.dishes?.reduce(
    (acc, dish) => acc + dish.quantity,
    0
  );

  const status = props.order.status;

  const statusColor = {
    nueva: '#FB8C8C',
    preparacion: '#F6AA1C',
    listo: '#AFE39C',
  };

  const statusIcon = {
    nueva: <FontAwesome name="bell" size={40} color="white" />,
    preparacion: <FontAwesome name="fire" size={40} color="white" />,
    listo: <FontAwesome name="check" size={40} color="white" />,
  };

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
      }}
      onPress={() => {
        props.navigation.navigate('order-details-cook', { order: props.order });
      }}
    >
      <View
        style={{
          width: '75%',
          padding: 15,
          overflow: 'hidden',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#941B0C' }}>
          {props.order.table.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12 }}
        >{`${orderDishesQuantity} platos`}</Text>
        <View>
          <Text numberOfLines={1} style={{ fontSize: 12 }}>
            {props.order.dishes
              ?.map((dish) => `${dish.quantity} ${dish.name}`)
              .join(', ')}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '25%',
          backgroundColor: statusColor[status as keyof typeof statusColor],
          borderTopEndRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {statusIcon[status as keyof typeof statusIcon]}
      </View>
    </TouchableOpacity>
  );
};
