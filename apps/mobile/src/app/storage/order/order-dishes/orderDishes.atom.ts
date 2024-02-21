import { atom } from 'recoil';
import { ItemOrder } from '../../../model/order.model';

export const orderDishesState = atom<ItemOrder[]>({
  key: 'orderDishesState',
  default: [],
});
