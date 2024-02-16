export interface Order {
  id: string;
  table: {
    id: string;
    name: string;
  };
  dishes?: itemOrder[];
  drinks?: itemOrder[];
  additional?: itemOrder[];
  note: string;
  total: number;
  status:
    | 'nueva'
    | 'preparacion'
    | 'listo'
    | 'servido'
    | 'completado'
    | 'cancelado';
  createdAt: Date;
  updatedAt: Date;
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
