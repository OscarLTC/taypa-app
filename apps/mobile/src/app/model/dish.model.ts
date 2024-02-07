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
