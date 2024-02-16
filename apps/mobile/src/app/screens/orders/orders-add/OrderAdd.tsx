import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, Route } from '@react-navigation/native';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import { OrderAddDishes } from '../../../components/orders/order-items-add/OrderAddDishes';
import { Table } from '../../../model/table.model';
import { useSetRecoilState } from 'recoil';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { OrderRegisterButton } from '../../../components/orders/OrderRegisterButton';
import { OrderAddDrinks } from '../../../components/orders/order-items-add/OrderAddDrinks';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { OrderAddAdditional } from '../../../components/orders/order-items-add/OrderAddAdditional';

interface OrderAddProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderAdd = (props: OrderAddProps) => {
  const { control, watch } = useForm<{ note: string }>();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(
    Keyboard.isVisible()
  );
  const setDishesState = useSetRecoilState(orderDishesState);

  const { table } = props.route.params as { table: Table };

  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboardVisible(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboardVisible(false);
  });

  return (
    <>
      <View
        style={{
          padding: 30,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <TouchableHighlight
            underlayColor={'#F6AA1C'}
            style={{
              position: 'absolute',
              left: 0,
              alignSelf: 'center',
              borderRadius: 100,
              backgroundColor: '#FFFFFF',
              zIndex: 1,
              flexDirection: 'row',
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            delayPressOut={100}
            onPress={() => {
              props.navigation.goBack();
              setDishesState([]);
            }}
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableHighlight>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {table?.name}
          </Text>
          <View style={{ position: 'absolute', top: -30, right: -30 }}>
            <Image
              source={require('../../../../../assets/araña_cortada_titulo.png')}
              style={{ width: 175, height: 190 }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 10,
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
              display: isKeyboardVisible ? 'none' : 'flex',
            }}
          >
            <OrderAddDishes navigation={props.navigation} />

            <OrderAddDrinks navigation={props.navigation} />
          </View>
          <OrderAddAdditional navigation={props.navigation} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Nota
            </Text>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    elevation: 1,
                  }}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={5}
                  maxLength={200}
                  textAlignVertical="top"
                />
              )}
            />
          </View>
        </View>
      </View>
      <OrderRegisterButton
        table={table}
        navigation={props.navigation}
        note={watch('note')}
      />
    </>
  );
};
