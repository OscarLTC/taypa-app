import { atom } from 'recoil';
import { Item } from '../../model/item.model';

export const dishesState = atom<Item[]>({
  key: 'dishesState',
  default: [],
});
