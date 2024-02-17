export enum Statuses {
  Nueva = 'nueva',
  Preparacion = 'preparacion',
  Listo = 'listo',
  Servido = 'servido',
  Completado = 'completado',
  Cancelado = 'cancelado',
}

export type Status =
  | 'nueva'
  | 'preparacion'
  | 'listo'
  | 'servido'
  | 'completado'
  | 'cancelado';
