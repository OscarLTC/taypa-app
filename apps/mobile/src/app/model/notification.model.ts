import { Role } from './roles.enum';

export interface Notification {
  id: string;
  adminId: number;
  message: string;
  date: Date;
  isShown: boolean;
  role: Role;
}
