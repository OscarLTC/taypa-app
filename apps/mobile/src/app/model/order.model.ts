import { Timestamp } from 'firebase/firestore';
import { Status } from './status.enum';

export interface Order {
  id: string;
  table: {
    id: string;
    name: string;
  };
  wasUpdated: boolean;
  dishes?: itemOrder[];
  drinks?: itemOrder[];
  additional?: itemOrder[];
  note: string;
  total: number;
  status: Status;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface itemOrder {
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
