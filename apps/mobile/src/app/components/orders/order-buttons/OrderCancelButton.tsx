import { Text, TouchableOpacity } from 'react-native';

export const OrderCancelButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#941B0C',
        paddingVertical: 5,
        paddingHorizontal: 15,
        position: 'absolute',
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
        Cancelar Orden
      </Text>
    </TouchableOpacity>
  );
};
