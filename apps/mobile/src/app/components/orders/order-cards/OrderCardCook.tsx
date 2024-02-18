import { Text, TouchableOpacity, View } from 'react-native';
import { Order } from '../../../model/order.model';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import moment from 'moment';

interface OrderCardCookProps {
  navigation: NavigationProp<ParamListBase>;
  order: Order;
}

export const OrderCardCook = (props: OrderCardCookProps) => {
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
          height: '100%',
          width: '75%',
          padding: 15,
          overflow: 'hidden',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#941B0C' }}>
          {props.order.table.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: props.order.note !== '' ? 'black' : '#a8a8a8',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Nota:</Text>
          {` ${props.order.note !== '' ? props.order.note : 'Sin nota'} `}
        </Text>
        <Text
          style={{
            position: 'absolute',
            color: '#a8a8a8',
            bottom: 10,
            left: 15,
            fontSize: 12,
          }}
        >
          {moment(props.order.updatedAt.toDate()).fromNow()}
        </Text>
        <View
          style={{
            position: 'absolute',
            right: 5,
            top: 5,
            padding: 5,
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: '#F6AA1C',
            justifyContent: 'center',
            display: props.order.wasUpdated ? 'flex' : 'none',
          }}
        >
          <AntDesign
            style={{
              alignSelf: 'center',
            }}
            name="exclamation"
            size={20}
            color="black"
          />
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
