import { View } from 'react-native';

export const DishListSkeleton = () => {
  return (
    <View style={{ marginTop: 40 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          key={index}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#FFFFFF',
                borderRadius: 15,
                marginBottom: 20,
                padding: 10,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: '#f2f2f2',
                  borderRadius: 15,
                }}
              ></View>
              <View
                style={{
                  width: '100%',
                  paddingTop: 15,
                  paddingHorizontal: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    borderRadius: 15,
                    width: '100%',
                    height: 15,
                    backgroundColor: '#f2f2f2',
                  }}
                ></View>
                <View
                  style={{
                    borderRadius: 15,
                    width: '100%',
                    height: 15,
                    backgroundColor: '#f2f2f2',
                  }}
                ></View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
