import { Text, View } from 'react-native';

interface OrderStatusBarProps {
  status: string;
}

export const OrderStatusBar = (props: OrderStatusBarProps) => {
  const status = ['nueva', 'preparacion', 'listo', 'servido', 'pagado'];
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        marginBottom: 40,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {status.map((s, index) => (
          <View
            style={{
              borderRadius: 50,
              backgroundColor: props.status === s ? '#7E7C7C' : '#D9D9D9',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
          >
            <Text
              style={{
                textAlign: 'center',
                color: props.status === s ? '#FFFFFF' : '#9B9A9A',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {index + 1}
            </Text>
            <Text
              style={{
                width: 70,
                position: 'absolute',
                bottom: -20,
                textAlign: 'center',
                fontSize: 10,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: props.status === s ? '#7E7C7C' : '#D9D9D9',
              }}
            >
              {s}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          height: 5,
          width: '100%',
          borderRadius: 10,
          position: 'absolute',
          bottom: 18,
          zIndex: -1,
        }}
      ></View>
    </View>
  );
};
