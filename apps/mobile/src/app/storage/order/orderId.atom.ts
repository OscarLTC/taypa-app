import { atom } from 'recoil';

export const orderIdState = atom<string>({
  key: 'orderIdState',
  default: '',
});
