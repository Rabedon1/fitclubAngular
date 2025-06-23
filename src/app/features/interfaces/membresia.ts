export interface MembresiaDto {
  id?: number; // ← Lo haces opcional
  nombreMembresia: string;
  descripcion: string;
  precio: number;
  vigencia: string;
}


export interface HistorialMembresiaDto {
  idUsuario: number;
  idMembresia: number;
  fechaInicio?: string;
  fechaFin?: string;
  valorMembresiaactual?: number;
  valorPagado: number;
  estado: boolean;
}

export interface HistorialMembresiaActivaDto {
  idHistorialMembresias: number;
  fechaInicio: string;
  fechaFin: string;
  estado: boolean;
  valorPagado: number;
  nombreMembresia: string;
  vigencia: string;
}
