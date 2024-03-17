import { Pressable, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { salesFilterState } from '../../storage/sales/salesFilter.atom';

export const SaleFilter = () => {
  const [show, setShow] = useState(false);
  const [salesFilter, setSalesFilter] = useRecoilState(salesFilterState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setSalesFilter(currentDate);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 12,
          color: '#6a040f',
          padding: 5,
          backgroundColor: 'white',
          borderRadius: 5,
        }}
      >
        Fecha: {moment(salesFilter).format('L')}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={salesFilter}
          mode={'date'}
          locale="es-ES"
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <Pressable
        onPress={() => setShow(true)}
        style={{
          padding: 5,
          borderRadius: 5,
          backgroundColor: '#890303',
          alignSelf: 'center',
        }}
      >
        <Entypo name="calendar" size={24} color="white" />
      </Pressable>
    </View>
  );
};
