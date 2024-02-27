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

export type ItemType = 'dish' | 'drink' | 'additional';
