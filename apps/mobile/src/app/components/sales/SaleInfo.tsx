import { Text, View } from 'react-native';
import { SaleDetailsProps } from './SaleStatus';
import { paymentMethods } from '../orders/order-modal/PayOrderModal';

export const SaleInfo = (props: SaleDetailsProps) => {
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.method === props.sale.paymentMethod
  );

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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Mesero:
        </Text>
        <Text
          style={{
            fontWeight: '500',
          }}
        >
          {props.sale.worker.completeName}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Total:
        </Text>
        <Text
          style={{
            fontWeight: '500',
          }}
        >{`S/ ${props.sale.total.toFixed(2)}`}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Mesa:
        </Text>
        <Text
          style={{
            fontWeight: '500',
          }}
        >
          {props.sale.table.name}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Método de pago:
        </Text>
        <Text
          style={{
            display: 'flex',
            padding: 2,
            backgroundColor: selectedPaymentMethod
              ? selectedPaymentMethod.color
              : 'white',
            borderRadius: 5,
            color: selectedPaymentMethod ? 'white' : 'black',
            width: 80,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {selectedPaymentMethod ? selectedPaymentMethod.method : 'asd'}
        </Text>
      </View>
    </View>
  );
};
