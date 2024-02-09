import { atom } from 'recoil';
import { DishOrder } from '../../../model/dish.model';

export const orderDishesState = atom<DishOrder[]>({
  key: 'orderDishesState',
  default: [],
});
