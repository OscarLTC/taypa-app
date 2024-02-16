import { Octicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ItemsCardCook } from '../order-items-card/itemsCardCook';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { subTotalDrinksSelector } from '../../../storage/order/order-drinks/orderDrinks.selector';

interface OrderAddDrinksProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAddDrinks = (props: OrderAddDrinksProps) => {
  const drinks = useRecoilValue(orderDrinksState);
  const subTotalDrinks = useRecoilValue(subTotalDrinksSelector);

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
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          Bebidas
        </Text>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#E3E3E3',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#626262',
              fontSize: 12,
            }}
          >{`S/ ${subTotalDrinks.toFixed(2)}`}</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          display: 'flex',
        }}
      >
        {drinks?.map((drink, index) => {
          return <ItemsCardCook key={index} item={drink} />;
        })}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('order-drink-list');
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
