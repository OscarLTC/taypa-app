export interface Order {
  id: string;
  table: {
    id: string;
    name: string;
  };
  dishes?: itemOrder[];
  drinks?: itemOrder[];
  aditional?: itemOrder[];
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

interface itemOrder {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    url: string;
  };
  subTotal: number;
}
