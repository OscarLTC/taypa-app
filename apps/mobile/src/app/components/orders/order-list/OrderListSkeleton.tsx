import { View } from 'react-native';

export const OrderListSkeleton = () => {
  return (
    <View
      style={{
        marginTop: 60,
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          style={{
            width: '100%',
            height: 120,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginBottom: 20,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              height: '100%',
              width: '75%',
              padding: 15,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: '100%',
                height: 20,
                backgroundColor: '#E8E8E8',
                borderRadius: 10,
              }}
            />
            <View
              style={{
                width: '100%',
                height: 20,
                backgroundColor: '#E8E8E8',
                borderRadius: 10,
              }}
            />
            <View
              style={{
                width: '100%',
                height: 20,
                backgroundColor: '#E8E8E8',
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              width: '25%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E8E8E8',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#E8E8E8',
                borderRadius: 20,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
