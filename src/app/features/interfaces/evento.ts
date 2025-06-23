export interface EventoDto {
  idEvento: number;
  nombreEvento: string;
  descripcion: string;
  cupoMaximo: number;
  fecha: string;  // o Date
  horaInicio: string;
  horraFin: string;
  cuposDisponibles?: number; // <-- aquí
}
