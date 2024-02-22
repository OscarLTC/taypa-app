import { Timestamp } from 'firebase/firestore';
import { Status } from './status.enum';

export interface Order {
  id: string;
  adminId: string;
  worker: {
    id: string;
    name: string;
  };
  table: {
    id: string;
    name: string;
  };
  wasUpdated: boolean;
  dishes?: ItemOrder[];
  drinks?: ItemOrder[];
  additional?: ItemOrder[];
  note: string;
  paymentMethod: string;
  total: number;
  status: Status;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ItemOrder {
  id: string;
  name: string;
  price: number;
  quantity: number;
  wasTaken: boolean;
  image: {
    url: string;
  };
  subTotal: number;
}
