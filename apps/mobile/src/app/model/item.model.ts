export interface Item {
  id: string;
  adminId: string;
  image: {
    url: string;
    name: string;
  };
  name: string;
  price: number;
}
