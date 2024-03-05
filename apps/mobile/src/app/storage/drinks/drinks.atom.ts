import { atom } from 'recoil';
import { Item } from '../../model/item.model';

export const drinksState = atom<Item[]>({
  key: 'drinksState',
  default: undefined,
});
