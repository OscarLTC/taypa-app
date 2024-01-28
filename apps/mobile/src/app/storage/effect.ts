const localStorageEffect =
  (key: string) =>
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSelf, onSet }: { setSelf: any; onSet: any }
  ) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: unknown, previousValue: unknown, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export { localStorageEffect };
