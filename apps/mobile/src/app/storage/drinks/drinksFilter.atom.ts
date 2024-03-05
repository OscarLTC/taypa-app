import { atom } from 'recoil';

export const drinksFilterState = atom<string>({
  key: 'drinksFilterState',
  default: '',
});
