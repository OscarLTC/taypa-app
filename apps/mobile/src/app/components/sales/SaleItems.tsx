import { View, Text } from 'react-native';
import { SaleDetailsProps } from './SaleStatus';
import { ItemOrder } from '../../model/order.model';

export const SaleItems = (props: SaleDetailsProps) => {
  const items: ItemOrder[] = [
    ...(props.sale.dishes ?? []),
    ...(props.sale.drinks ?? []),
    ...(props.sale.additional ?? []),
  ];

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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            width: '40%',
            fontWeight: '500',
          }}
        >
          Producto
        </Text>
        <Text
          style={{
            width: '20%',
            fontSize: 12,
            textAlign: 'center',
            borderLeftWidth: 1,
            borderColor: '#ebebeb',
            fontWeight: '500',
          }}
        >
          Cantidad
        </Text>
        <Text
          style={{
            width: '20%',
            fontSize: 12,
            textAlign: 'center',
            borderLeftWidth: 1,
            borderColor: '#ebebeb',
            fontWeight: '500',
          }}
        >
          Precio
        </Text>
        <Text
          style={{
            width: '20%',
            fontSize: 12,
            borderLeftWidth: 1,
            borderColor: '#ebebeb',
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          Subtotal
        </Text>
      </View>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              width: '40%',
              fontWeight: '500',
              overflow: 'hidden',
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              width: '20%',
              textAlign: 'center',
              borderLeftWidth: 1,
              borderColor: '#ebebeb',
            }}
          >
            {item.quantity}
          </Text>
          <Text
            style={{
              fontSize: 12,
              width: '20%',
              textAlign: 'center',
              borderLeftWidth: 1,
              borderColor: '#ebebeb',
            }}
          >
            {`S/ ${item.price}`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              width: '20%',
              textAlign: 'center',
              borderLeftWidth: 1,
              borderColor: '#ebebeb',
            }}
          >{`S/ ${item.subTotal}`}</Text>
        </View>
      ))}
    </View>
  );
};
