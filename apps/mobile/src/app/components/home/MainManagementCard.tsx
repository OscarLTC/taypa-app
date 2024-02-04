import { Image, Text, TouchableOpacity, View } from 'react-native';

export const MainManagementCard = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#D61717',
          padding: 5,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          height: 120,
          overflow: 'hidden',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          Gestión de Platos
        </Text>
        <Image
          style={{
            position: 'absolute',
            bottom: -20,
            left: 20,
            width: 150,
            height: 100,
            objectFit: 'contain',
          }}
          source={require('../../../../assets/lomo_saltado.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#EF4242',
          padding: 5,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          height: 120,
          overflow: 'hidden',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          Gestión de Bebidas
        </Text>
        <Image
          style={{
            position: 'absolute',
            bottom: -20,
            left: 20,
            width: 150,
            height: 100,
            objectFit: 'contain',
          }}
          source={require('../../../../assets/bebida.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#FE8282',
          padding: 5,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          height: 120,
          overflow: 'hidden',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          Gestión de Adicionales
        </Text>
        <Image
          style={{
            position: 'absolute',
            bottom: -20,
            left: 30,
            width: 150,
            height: 100,
            objectFit: 'contain',
          }}
          source={require('../../../../assets/adicional.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
