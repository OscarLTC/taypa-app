import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { Text, View } from 'react-native';
import { Order } from '../../model/order.model';
import { Statuses } from '../../model/status.enum';

export interface SaleDetailsProps {
  sale: Order;
}

export const SaleStatus = (props: SaleDetailsProps) => {
  return (
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
      {props.sale.status === Statuses.Completado ? (
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
              {moment(props.sale.createdAt.toDate()).format('h:mm a')}
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
              {moment(props.sale.updatedAt.toDate()).format('h:mm a')}
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
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#666e6e',
              borderRadius: 100,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome name="close" size={20} color="white" />
          </View>
          <Text>Cancelado</Text>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            {moment(props.sale.updatedAt.toDate()).format('h:mm a')}
          </Text>
        </View>
      )}
    </View>
  );
};
