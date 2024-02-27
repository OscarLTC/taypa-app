import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Item } from '../../model/item.model';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { DishRemoveButton } from './DishRemoveButton';
import { useState } from 'react';
import { DishDetailsModal } from '../../screens/dishes/dish-details/DishDetailsModal';

interface DishCardProps {
  dish: Item;
  navigation: NavigationProp<ParamListBase>;
}
export const DishCard = (props: DishCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
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
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={
            props.dish.image.url
              ? { uri: props.dish.image.url }
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
            {props.dish.name}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#941B0C',
            }}
          >
            {`S/ ${Number(props.dish.price).toFixed(2)}`}
          </Text>
        </View>
        <DishRemoveButton dish={props.dish} />
      </TouchableOpacity>
      <DishDetailsModal
        modalVisible={modalVisible}
        navigation={props.navigation}
        setModalVisible={setModalVisible}
        item={props.dish}
      />
    </>
  );
};
