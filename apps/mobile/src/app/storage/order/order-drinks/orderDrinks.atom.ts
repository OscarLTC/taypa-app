import { atom } from 'recoil';
import { ItemOrder } from '../../../model/order.model';

export const orderDrinksState = atom<ItemOrder[]>({
  key: 'orderDrinksState',
  default: [],
});
