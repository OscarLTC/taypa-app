import { selector } from 'recoil';
import { additionalFilterState } from './additionalFilter.atom';
import { additionalState } from './additional.atom';

export const additionalSelector = selector({
  key: 'additionalSelector',
  get: ({ get }) => {
    const filter = get(additionalFilterState);
    const list = get(additionalState);

    if (!filter.trim()) {
      return list;
    }

    return list.filter((dish) =>
      dish.name.toLowerCase().includes(filter.toLowerCase())
    );
  },
});
