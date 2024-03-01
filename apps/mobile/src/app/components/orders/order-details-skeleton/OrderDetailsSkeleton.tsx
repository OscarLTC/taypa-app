import { View } from 'react-native';

export const OrderDetailsSkeleton = () => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 40,
          marginBottom: 40,
          borderRadius: 50,
          backgroundColor: '#D9D9D9',
        }}
      ></View>
      <View
        style={{
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: '20%',
                height: 20,
                borderRadius: 30,
                backgroundColor: '#D9D9D9',
              }}
            ></View>
            <View
              key={index}
              style={{
                marginTop: 10,
                width: '100%',
                flexDirection: 'row',
                gap: 10,
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: '35%',
                    height: 150,
                    borderRadius: 20,
                    backgroundColor: '#D9D9D9',
                  }}
                ></View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
