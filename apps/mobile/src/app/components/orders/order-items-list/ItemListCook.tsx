import { ScrollView, Text, View } from 'react-native';
import { ItemOrder } from '../../../model/order.model';
import { ItemsCardCook } from '../role-items-card/itemsCardCook';

interface ItemListWaiterProps {
  items: ItemOrder[];
  title: string;
}

export const ItemListCook = (props: ItemListWaiterProps) => {
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
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          display: 'flex',
        }}
      >
        {props.items.map((item, index) => {
          return <ItemsCardCook key={index} item={item} />;
        })}
      </ScrollView>
    </>
  );
};
