import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageEffect =
  (key: string) =>
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSelf, onSet }: { setSelf: any; onSet: any }
  ) => {
    AsyncStorage.getItem(key).then((savedValue) => {
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      } else {
        setSelf(null);
      }
    });

    onSet((newValue: unknown, previousValue: unknown, isReset: boolean) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export { localStorageEffect };
