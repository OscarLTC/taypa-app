import { atom } from 'recoil';

export const additionalFilterState = atom<string>({
  key: 'additionalFilterState',
  default: '',
});
