import { View } from 'react-native';

export function WorkerListSkeleton() {
  return (
    <View
      style={{
        marginTop: 60,
        marginBottom: 30,
        borderRadius: 20,
        flexDirection: 'column',
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 20,
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#e0e0e0',
              borderRadius: 50,
            }}
          />
          <View
            style={{
              width: '80%',
              height: 20,
              backgroundColor: '#e0e0e0',
              borderRadius: 10,
            }}
          />
        </View>
      ))}
    </View>
  );
}

export default WorkerListSkeleton;
