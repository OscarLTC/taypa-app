import { atom } from 'recoil';
import { Session } from '../../model/session.model';
import { localStorageEffect } from '../effect';

export const userState = atom<Session | string | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [localStorageEffect('userState')],
});
