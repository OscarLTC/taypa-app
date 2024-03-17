import { atom } from 'recoil';

export const salesFilterState = atom<Date>({
  key: 'salesFilterState',
  default: new Date(),
});
