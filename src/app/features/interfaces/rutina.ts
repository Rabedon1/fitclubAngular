export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadEjercicios: number;
}

export interface EjercicioRutina {
  ejercicioId: number;
  nombre: string;
  descripcion: string;
  repeticiones: number;
  series: number;
}

export interface RutinaDetalle {
  id: number;
  nombre: string;
  descripcion: string;
  ejercicios: EjercicioRutina[];
}

export interface CrearRutinaDTO {
  nombre: string;
  descripcion: string;
  ejercicios: {
    ejercicioId: number;
    repeticiones: number;
    series: number;
  }[];
}
