export interface Table {
  id: string;
  adminId: string;
  name: string;
  number: number;
  usageStatus: 'disponible' | 'ocupada';
}
