import { Octicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';
import { subTotalAdditionalSelector } from '../../../storage/order/order-additional/orderAdditional.selector';
import { ItemsCard } from '../role-items-card/itemsCard';

interface OrderAddAdditionalProps {
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAddAdditional = (props: OrderAddAdditionalProps) => {
  const additional = useRecoilValue(orderAdditionalState);
  const subTotalAdditional = useRecoilValue(subTotalAdditionalSelector);

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
          Adicionales
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
          >{`S/ ${subTotalAdditional.toFixed(2)}`}</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          display: 'flex',
        }}
      >
        {additional?.map((additional, index) => {
          return <ItemsCard key={index} item={additional} type="additional" />;
        })}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('order-additional-list');
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
