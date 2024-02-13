import { Image, Text, View } from 'react-native';
import { itemOrder } from '../../../model/order.model';

interface ItemsCardCashierProps {
  item: itemOrder;
}

export const ItemsCardCashier = (props: ItemsCardCashierProps) => {
  return (
    <View
      style={{
        marginRight: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 120,
        padding: 5,
      }}
    >
      <View
        style={{
          height: 70,
          borderRadius: 15,
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            objectFit: 'contain',
          }}
          source={{ uri: props.item.image.url }}
        />
      </View>

      <View
        style={{
          display: 'flex',
          zIndex: 1,
          flexDirection: 'column',
          paddingHorizontal: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            overflow: 'hidden',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#941B0C',
          }}
        >
          {props.item.name}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 10,
            }}
          >
            Cant.
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#941B0C',
            }}
          >
            {props.item.quantity}
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
              fontSize: 10,
            }}
          >
            Precio
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#941B0C',
            }}
          >
            {`S/ ${Number(props.item.price).toFixed(2)}`}
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
              fontSize: 10,
            }}
          >
            Sub.
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#941B0C',
            }}
          >
            {`S/ ${Number(props.item.subTotal).toFixed(2)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};
