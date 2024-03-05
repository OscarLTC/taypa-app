import { selector } from 'recoil';
import { dishesFilterState } from './dishesFilter.atom';
import { dishesState } from './dishes.atom';

export const dishesSelector = selector({
  key: 'dishesSelector',
  get: ({ get }) => {
    const filter = get(dishesFilterState);
    const list = get(dishesState);

    if (!filter.trim()) {
      return list;
    }

    return list.filter((dish) =>
      dish.name.toLowerCase().includes(filter.toLowerCase())
    );
  },
});
