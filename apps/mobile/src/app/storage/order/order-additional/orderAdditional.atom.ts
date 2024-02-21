import { atom } from 'recoil';
import { ItemOrder } from '../../../model/order.model';

export const orderAdditionalState = atom<ItemOrder[]>({
  key: 'orderAdditionalState',
  default: [],
});
