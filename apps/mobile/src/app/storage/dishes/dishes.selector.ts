import { selector } from 'recoil';
import { dishesFilterState } from './dishesFilter.atom';
import { dishesState } from './dishes.atom';

export const dishesSelector = selector({
  key: 'dishesSelector',
  get: ({ get }) => {
    const filter = get(dishesFilterState);
    const list = get(dishesState);

    if (filter === '') {
      return list;
    } else {
      return list.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  },
});
