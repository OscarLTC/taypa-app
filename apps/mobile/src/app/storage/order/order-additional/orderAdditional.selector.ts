import { selector } from 'recoil';
import { orderAdditionalState } from './orderAdditional.atom';

export const subTotalAdditionalSelector = selector({
  key: 'subTotalAdditionalSelector',
  get: ({ get }) => {
    const additionals = get(orderAdditionalState);
    if (additionals) {
      return additionals.reduce(
        (acc, additional) => acc + additional.subTotal,
        0
      );
    }
    return 0;
  },
});
