import { selector } from 'recoil';
import { orderDrinksState } from './orderDrinks.atom';

export const subTotalDrinksSelector = selector({
  key: 'subTotalDrinksSelector',
  get: ({ get }) => {
    const drinks = get(orderDrinksState);
    if (drinks) {
      return drinks.reduce((acc, drink) => acc + drink.subTotal, 0);
    }
    return 0;
  },
});
