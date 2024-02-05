export interface Worker {
  id: string;
  adminId: string;
  names: string;
  lastnames: string;
  roles: string[];
  image: {
    url: string;
    name: string;
  };
}
