import { Octicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OrderDishAddedCard } from './OrderDishAddedCard';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { orderDishesState } from '../../storage/order/orderDishes';

interface OrderAddDishesProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAddDishes = (props: OrderAddDishesProps) => {
  const dishes = useRecoilValue(orderDishesState);

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          Platos
        </Text>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor: '#AFE39C',
          }}
        >
          <Text>Total</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          display: 'flex',
        }}
      >
        {dishes?.map((dish, index) => {
          return <OrderDishAddedCard key={index} dish={dish} />;
        })}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('order-dish-list');
          }}
          style={{
            width: 110,
            height: 110,
            backgroundColor: '#fff',
            borderRadius: 20,
            display: 'flex',
            borderWidth: 2,
            borderColor: '#c4c4c4',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Octicons name="plus" size={60} color="#c4c4c4" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
