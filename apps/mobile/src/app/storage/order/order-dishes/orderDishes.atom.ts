import { atom } from 'recoil';
import { itemOrder } from '../../../model/order.model';

export const orderDishesState = atom<itemOrder[]>({
  key: 'orderDishesState',
  default: [],
});
