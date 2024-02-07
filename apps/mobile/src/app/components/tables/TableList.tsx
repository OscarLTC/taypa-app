import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { TableAdd } from './TableAdd';
import { tablesSelector } from '../../storage/tables/tables.selector';

export const TableList = () => {
  const tables = useRecoilValue(tablesSelector);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 60,
        marginBottom: 50,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 4,
          gap: 15,
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        {tables.map((table, index) => {
          if (index == tables.length - 1) {
            return (
              <TouchableHighlight
                style={{
                  backgroundColor: '#FEA1A1',
                  borderRadius: 10,
                  elevation: 1,
                  height: 60,
                  width: '25%',
                  margin: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={table.id}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    style={{
                      position: 'absolute',
                      right: 2,
                      bottom: 3,
                    }}
                    name="trash"
                    size={20}
                    color="white"
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    {index + 1}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }
          return (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 1,
                height: 60,
                width: '25%',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={table.id}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {index + 1}
              </Text>
            </View>
          );
        })}
        <TableAdd />
      </View>
    </ScrollView>
  );
};
