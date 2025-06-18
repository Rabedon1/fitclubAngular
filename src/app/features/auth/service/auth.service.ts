import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials, User, LoginResponse, DecodedToken } from '../interfaces/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  jwtHelper: any;

  constructor(private http: HttpClient, private router: Router) {}

  //manda las credenciales de inicio de sesión al servidor y devuelve un observable con la respuesta
  //El observable se puede suscribir para recibir la respuesta cuando esté disponible
  //El método `login` envía una solicitud POST al servidor con las credenciales del usuario
  //y guarda el token de autenticación en el almacenamiento local si la respuesta es exitosa.
  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          console.log('Login exitoso, guardando token:', response.token);
          localStorage.setItem('token', response.token);
        } else {
          console.error('Login fallido, no se recibió token');
        }
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => { this.router.navigate(['auth/login']); }) // Redirigir al login después del registro
    );
  }

  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token desde localStorage
   getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('getToken: Token recuperado:', token ? 'Presente' : 'Ausente');
    return token;
  }


  // Decodificar el token para extraer información (sin verificar la firma)
  decodeToken(token: string): DecodedToken | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        sub: payload.sub,
        rol: payload.rol,
        iat: payload.iat,
        exp: payload.exp
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  // Verificar si el usuario está autenticado
    isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log('isAuthenticated: No se encontró token');
      return false;
    }
    const isNotExpired = !this.jwtHelper.isTokenExpired(token);
    console.log('isAuthenticated: Token encontrado, no expirado:', isNotExpired);
    return isNotExpired;
  }

  // Obtener el rol del usuario
    getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = this.jwtHelper.decodeToken(token);
        const role = decoded.rol || null;
        console.log('getUserRole: Rol decodificado:', role);
        return role;
      } catch (error) {
        console.error('getUserRole: Error al decodificar token:', error);
        return null;
      }
    }
    console.log('getUserRole: No hay token');
    return null;
  }

  // Cerrar sesión
   logout(): void {
    console.log('Cerrando sesión, eliminando token');
    localStorage.removeItem('token');
  }
}
