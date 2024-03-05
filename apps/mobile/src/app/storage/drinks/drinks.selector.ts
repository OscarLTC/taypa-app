import { selector } from 'recoil';
import { drinksFilterState } from './drinksFilter.atom';
import { drinksState } from './drinks.atom';

export const drinksSelector = selector({
  key: 'drinksSelector',
  get: ({ get }) => {
    const filter = get(drinksFilterState);
    const list = get(drinksState);

    if (!filter.trim()) {
      return list;
    }

    return list.filter((dish) =>
      dish.name.toLowerCase().includes(filter.toLowerCase())
    );
  },
});
