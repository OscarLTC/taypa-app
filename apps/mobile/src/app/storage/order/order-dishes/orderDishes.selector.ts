import { selector } from 'recoil';
import { orderDishesState } from './orderDishes.atom';

export const subTotalDishesSelector = selector({
  key: 'subTotalDishesSelector',
  get: ({ get }) => {
    const dishes = get(orderDishesState);
    if (dishes) {
      return dishes.reduce((acc, dish) => acc + dish.subTotal, 0);
    }
    return 0;
  },
});
