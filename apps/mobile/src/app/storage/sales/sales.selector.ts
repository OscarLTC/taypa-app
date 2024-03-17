import { selector } from 'recoil';
import { salesState } from './sales.atom';

export const salesSelector = selector<number>({
  key: 'salesSelector',
  get: ({ get }) => {
    const sales = get(salesState);
    const total = sales.reduce((acc, sale) => acc + sale.total, 0);
    return total;
  },
});
