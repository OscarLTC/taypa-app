import { View } from 'react-native';

export const WorkerDetailsSkeleton = () => {
  return (
    <View
      style={{
        paddingVertical: 30,
        paddingHorizontal: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '30%',
          height: 30,
          borderRadius: 20,
          alignSelf: 'flex-start',
          backgroundColor: '#E0E0E0',
          marginBottom: 20,
        }}
      ></View>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          width: '100%',
        }}
      >
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            height: 25,
            backgroundColor: '#E0E0E0',
          }}
        ></View>
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            height: 25,
            backgroundColor: '#E0E0E0',
          }}
        ></View>
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            height: 25,
            backgroundColor: '#E0E0E0',
          }}
        ></View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View
          style={{
            height: 40,
            width: 100,
            borderRadius: 20,
            backgroundColor: '#E0E0E0',
          }}
        ></View>
        <View
          style={{
            height: 40,
            width: 100,
            borderRadius: 20,
            backgroundColor: '#E0E0E0',
          }}
        ></View>
      </View>
    </View>
  );
};
