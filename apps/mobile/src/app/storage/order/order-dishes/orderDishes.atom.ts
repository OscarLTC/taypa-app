import { atom } from 'recoil';
import { DishOrder } from '../../../model/item.model';

export const orderDishesState = atom<DishOrder[]>({
  key: 'orderDishesState',
  default: [],
});
