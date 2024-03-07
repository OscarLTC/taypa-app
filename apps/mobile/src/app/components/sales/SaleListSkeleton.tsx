import { View } from 'react-native';

export const SaleListSkeleton = () => {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'column',
        gap: 10,
        margin: 10,
      }}
    >
      <View
        style={{
          height: 40,
          backgroundColor: '#FFFFFF',
          padding: 10,
          width: '50%',
          borderRadius: 15,
          display: 'flex',
        }}
      ></View>
      {Array.from({ length: 7 }).map((_, index) => (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            padding: 10,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            height: 80,
          }}
          key={index}
        ></View>
      ))}
    </View>
  );
};
