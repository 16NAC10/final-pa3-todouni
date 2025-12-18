export interface Task {
  id?: string;
  titulo: string;
  materia: string;
  fechaVencimiento: string; // ISO yyyy-MM-dd
  prioridad: 'alta' | 'media' | 'baja';
  completada: boolean;
  descripcion?: string;
}
