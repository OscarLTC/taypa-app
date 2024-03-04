import { atom } from 'recoil';
import { Session } from '../../model/session.model';
import { localStorageEffect } from '../effect';

export const userState = atom<undefined | null | Session>({
  key: 'userState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('userState')],
});
