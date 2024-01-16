export interface Session {
  deviceId: string;
  deviceName: string;
  deviceOS: string;
  userId: string;
  timestamp: number;
}

export interface FirebaseSession extends Session {
  id: string;
}
