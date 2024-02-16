import { atom } from 'recoil';
import { itemOrder } from '../../../model/order.model';

export const orderAdditionalState = atom<itemOrder[]>({
  key: 'orderAdditionalState',
  default: [],
});
