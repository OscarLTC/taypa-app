import { Text, TouchableOpacity, View } from 'react-native';
import { Order } from '../../model/order.model';
import moment from 'moment';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Statuses } from '../../model/status.enum';

interface SaleCardProps {
  navigation: NavigationProp<ParamListBase>;
  sale: Order;
}

export const SaleCard = (props: SaleCardProps) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        flexDirection: 'column',
        padding: 15,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={() => {
        props.navigation.navigate('sale-details', props.sale);
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 12,
          }}
        >
          {moment(props.sale.createdAt.toDate()).format('L  LTS')}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#890303',
          }}
        >
          {props.sale.status !== Statuses.Cancelado
            ? `S/ ${props.sale.total.toFixed(2)}`
            : '----'}
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#BBB3B3',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {props.sale.worker?.completeName}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            width: 80,
            fontWeight: 'bold',
            fontSize: 12,
            backgroundColor:
              props.sale.status === Statuses.Cancelado ? '#890303' : '#D9D9D9',
            padding: 2,
            borderRadius: 30,
            color:
              props.sale.status === Statuses.Cancelado ? 'white' : '#655F5F',
          }}
        >
          {props.sale.paymentMethod ?? 'Cancelado'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
