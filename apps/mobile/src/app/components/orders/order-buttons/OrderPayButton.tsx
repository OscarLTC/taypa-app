import { Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { PayOrderModal } from '../order-modal/PayOrderModal';
import { useState } from 'react';

interface OrderPayButtonProps {
  orderId: string;
  tableId: string;
  navigation: NavigationProp<ParamListBase>;
}

export const OrderPayButton = (props: OrderPayButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        // @ts-expect-error position fixed is not available in web
        style={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          backgroundColor: '#941B0C',
          paddingVertical: 5,
          paddingHorizontal: 15,
          width: '100%',
          bottom: 0,
          height: 60,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          Pagar
        </Text>
      </TouchableOpacity>
      <PayOrderModal
        modalVisible={modalVisible}
        navigation={props.navigation}
        setModalVisible={setModalVisible}
        orderId={props.orderId}
        tableId={props.tableId}
      />
    </>
  );
};
