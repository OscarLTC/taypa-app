import { atom } from 'recoil';

export const dishesFilterState = atom<string>({
  key: 'dishesFilterState',
  default: '',
});
