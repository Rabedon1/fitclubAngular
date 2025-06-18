export interface Usuario {
  id: number;
  correo: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  edad: number;
  cedula: string;
  idRol: number;
  // Añade más campos según la entidad Usuario en el backend
}

export interface UsuarioDto {
  idUsuario: number;
  nombres: string;
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
    idUsuario: number;
    correo: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    edad: number;
    cedula: string;
    idRol: number;

}
