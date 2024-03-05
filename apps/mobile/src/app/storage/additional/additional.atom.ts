import { atom } from 'recoil';
import { Item } from '../../model/item.model';

export const additionalState = atom<Item[]>({
  key: 'additionalState',
  default: undefined,
});
