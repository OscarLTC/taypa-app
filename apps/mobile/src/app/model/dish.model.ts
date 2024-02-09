export interface Dish {
  id: string;
  adminId: string;
  image: {
    url: string;
    name: string;
  };
  name: string;
  price: number;
  description: string;
}

export interface DishOrder {
  id: string;
  name: string;
  price: number;
  image: {
    url: string;
  };
  quantity: number;
  subTotal: number;
}
