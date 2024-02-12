import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Order } from '../../model/order.model';
import { FontAwesome } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = (props: OrderCardProps) => {
  const updateOrderStatus = async () => {
    const orderId = props.order.id;
    const orderRef = doc(firestore, 'orders', orderId);
    await updateDoc(orderRef, {
      ...props.order,
      status: 'completado',
    }).then(() => {
      const tableRef = doc(firestore, 'tables', props.order.table.id);
      updateDoc(tableRef, {
        ...props.order.table,
        usageStatus: 'disponible',
      });
    });
  };

  const orderDishesQuantity = props.order.dishes?.reduce(
    (acc, dish) => acc + dish.quantity,
    0
  );

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
      <TouchableHighlight
        onPress={updateOrderStatus}
        underlayColor={'#F6AA1C'}
        delayPressOut={100}
        style={{
          width: '25%',
          backgroundColor: '#941B0C',
          borderTopEndRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesome name="check" size={30} color="white" />
      </TouchableHighlight>
    </TouchableOpacity>
  );
};
