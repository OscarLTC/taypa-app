import { atom } from 'recoil';
import { Order } from '../../model/order.model';

export const salesState = atom<Order[]>({
  key: 'salesState',
  default: [],
});
