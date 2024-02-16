import { atom } from 'recoil';
import { itemOrder } from '../../../model/order.model';

export const orderDrinksState = atom<itemOrder[]>({
  key: 'orderDrinksState',
  default: [],
});
