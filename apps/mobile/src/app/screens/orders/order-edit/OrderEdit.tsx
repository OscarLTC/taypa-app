import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import {
  Image,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { OrderAddAdditional } from '../../../components/orders/order-items-add/OrderAddAdditional';
import { OrderAddDishes } from '../../../components/orders/order-items-add/OrderAddDishes';
import { OrderAddDrinks } from '../../../components/orders/order-items-add/OrderAddDrinks';
import { orderDishesState } from '../../../storage/order/order-dishes/orderDishes.atom';
import { Route, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Order } from '../../../model/order.model';
import { useEffect, useState } from 'react';
import { orderDrinksState } from '../../../storage/order/order-drinks/orderDrinks.atom';
import { orderAdditionalState } from '../../../storage/order/order-additional/orderAdditional.atom';
import { OrderEditButton } from '../../../components/orders/OrderEditButton';

interface OrderEditProps {
  route: Route<string>;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderEdit = (props: OrderEditProps) => {
  const { control, watch, setValue } = useForm<{ note: string }>();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const setDishesState = useSetRecoilState(orderDishesState);
  const setDrinksState = useSetRecoilState(orderDrinksState);
  const setAdditionalState = useSetRecoilState(orderAdditionalState);

  const { order } = props.route.params as { order: Order };

  if (Platform.OS !== 'web') {
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
  }

  useEffect(() => {
    if (order) {
      setDishesState(order.dishes || []);
      setDrinksState(order.drinks || []);
      setAdditionalState(order.additional || []);
      setValue('note', order.note);
    }
  }, []);

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
              setDishesState([]);
              setDishesState([]);
            }}
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableHighlight>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {order.table.name}
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
                  numberOfLines={Platform.OS === 'web' ? 3 : 5}
                  maxLength={200}
                  textAlignVertical="top"
                />
              )}
            />
          </View>
        </View>
      </View>
      <OrderEditButton
        navigation={props.navigation}
        order={order}
        note={watch('note')}
      />
    </>
  );
};
