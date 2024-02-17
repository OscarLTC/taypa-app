import { ScrollView, Text, View } from 'react-native';
import { itemOrder } from '../../../model/order.model';
import { ItemsCardCashier } from '../role-items-card/ItemsCardCashier';

interface ItemListCashierProps {
  items: itemOrder[];
  title: string;
}

export const ItemListCashier = (props: ItemListCashierProps) => {
  const getSubTotalItems = (items: itemOrder[]) => {
    return items.reduce((acc: number, item: itemOrder) => {
      return acc + item.subTotal;
    }, 0);
  };

  return (
    <>
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
          {props.title}
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
          >{`S/ ${getSubTotalItems(props.items).toFixed(2)}`}</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          display: 'flex',
        }}
      >
        {props.items.map((item, index) => {
          return <ItemsCardCashier key={index} item={item} />;
        })}
      </ScrollView>
    </>
  );
};
