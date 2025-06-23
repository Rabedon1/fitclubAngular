export interface User {
  rol: { idRol: number };
  cedula: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  // fechaIngreso: string;
  // edad: number;
  correo: string;
  telefono: string;
  contrasena: string;
}

export interface LoginCredentials {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  sub: string;
  rol: string;
  iat: number;
  exp: number;
}
