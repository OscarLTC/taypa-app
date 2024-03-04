export interface Session {
  userId: string;
  email: string | null;
  accessToken: string;
  isSignedIn: boolean;
  isLocked: boolean;
}
