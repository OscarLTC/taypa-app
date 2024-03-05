import { TextInput, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { AntDesign } from '@expo/vector-icons';
import { additionalFilterState } from '../../storage/additional/additionalFilter.atom';

export const AdditionalFilter = () => {
  const setFilter = useSetRecoilState(additionalFilterState);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
        }}
      >
        <AntDesign name="search1" size={20} color="#000000" />
      </View>
      <TextInput
        placeholder="Buscar adicional"
        style={{
          width: '100%',
          height: 40,
          paddingLeft: 10,
          paddingRight: 15,
          fontSize: 16,
        }}
        onChange={(e) => setFilter(e.nativeEvent.text)}
      />
    </View>
  );
};
