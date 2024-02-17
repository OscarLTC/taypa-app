import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Item } from '../../model/item.model';
import { DrinkRemoveButton } from './DrinkRemoveButton';

interface DrinkCardProps {
  drink: Item;
  navigation: NavigationProp<ParamListBase>;
}

export const DrinkCard = (props: DrinkCardProps) => {
  return (
    <TouchableOpacity
      delayPressIn={100}
      delayPressOut={100}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        padding: 10,
      }}
      onPress={() =>
        props.navigation.navigate('drink-details', {
          drinkId: props.drink.id,
        })
      }
    >
      <Image
        source={
          props.drink.image.url
            ? { uri: props.drink.image.url }
            : require('../../../../assets/lomo_saltado.png')
        }
        resizeMode="contain"
        style={{
          width: '100%',
          height: 100,
          objectFit: 'contain',
        }}
      ></Image>
      <View
        style={{
          width: '100%',
          paddingTop: 10,
          borderTopColor: '#f2f2f2',
          borderTopWidth: 1,
          paddingHorizontal: 5,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            overflow: 'hidden',
            fontSize: 12,
          }}
        >
          {props.drink.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#941B0C',
          }}
        >
          {`S/ ${Number(props.drink.price).toFixed(2)}`}
        </Text>
      </View>
      <DrinkRemoveButton drink={props.drink} />
    </TouchableOpacity>
  );
};
