import { User } from 'firebase/auth';
import { atom } from 'recoil';
import { localStorageEffect } from '../effect';

export const userState = atom<User | null>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [localStorageEffect('user')],
});
