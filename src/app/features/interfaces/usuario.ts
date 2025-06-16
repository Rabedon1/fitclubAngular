export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  // Añade más campos según la entidad Usuario en el backend
}

export interface UsuarioDto {
  idUsuario: number;
  nombre: string;
  correo: string;
  apellidos: string;
  telefono: string;
  edad: number;
  cedula: string;
  idRol: number;
  fechaNacimiento: Date;
  fechaIngreso: Date;
}


export interface UpdateUserRequestDto {
  nombre?: string;
  correo?: string;
  // Añade más campos según UpdateUserRequestDto en el backend
}
