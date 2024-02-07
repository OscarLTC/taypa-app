import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const MainManagementCard = (navigation: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const managmentData = [
    {
      title: 'Gestión de Platos',
      color: '#D61717',
      image: require('../../../../assets/lomo_saltado.png'),
      redirect: 'dishes',
    },
    {
      title: 'Gestión de Bebidas',
      color: '#EF4242',
      image: require('../../../../assets/bebida.png'),
      redirect: 'drinks',
    },
    {
      title: 'Gestión de Adicionales',
      color: '#FE8282',
      image: require('../../../../assets/adicional.png'),
      redirect: 'additionals',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {managmentData.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigation.navigate(item.redirect);
          }}
          key={index}
          style={{
            backgroundColor: item.color,
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
            {item.title}
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
            source={item.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
