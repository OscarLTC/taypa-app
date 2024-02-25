import { Role } from './roles.enum';

export interface Notification {
  id: string;
  adminId: number;
  message: string;
  date: Date;
  wasSoundPlayed: boolean;
  isShown: boolean;
  role: Role;
}
