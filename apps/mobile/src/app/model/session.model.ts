export interface Session {
  userId: string;
  email: string | null;
  accessToken: string;
  isLocked: boolean;
}
