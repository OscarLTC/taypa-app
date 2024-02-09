import { atom } from 'recoil';
import { userLocked } from '../../model/userLocked';

export const userLockedState = atom<userLocked | null>({
  key: 'userLockedState',
  default: null,
});
