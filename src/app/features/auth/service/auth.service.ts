import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginCredentials, User, LoginResponse, DecodedToken } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://backend-gimnasio-v1.onrender.com/api/auth';
  redirectUrl: string | null = null; // Para redirigir tras login

  constructor(private http: HttpClient, private router: Router) {}

  // Login: envía credenciales y guarda el token
  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
         // console.log('Login exitoso, guardando token:', response.token);
          localStorage.setItem('token', response.token);
        } else {
          console.error('Login fallido, no se recibió token');
        }
      })
    );
  }

  // Registro: envía datos del usuario y redirige al login
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => {
        this.router.navigate(['auth/login']);
      })
    );
  }

  // Guardar el token
  saveToken(token: string): void {
   // console.log('Guardando token:', token);
    localStorage.setItem('token', token);
  }

  // Obtener el token
  getToken(): string | null {
    const token = localStorage.getItem('token');
   // console.log('getToken: Token recuperado:', token ? 'Presente' : 'Ausente');
    return token;
  }

  // Decodificar el token
  decodeToken(token: string): DecodedToken | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        sub: payload.sub,
        rol: payload.rol, // Coincide con el claim 'rol' del backend
        iat: payload.iat,
        exp: payload.exp
      };
    } catch (e) {
     // console.error('Error decodificando token:', e);
      return null;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
     // console.log('isAuthenticated: No se encontró token');
      return false;
    }
    const decoded = this.decodeToken(token);
    if (!decoded) {
      //console.log('isAuthenticated: Token inválido');
      return false;
    }
    const isNotExpired = decoded.exp * 1000 > Date.now();
   // console.log('isAuthenticated: Token encontrado, no expirado:', isNotExpired);
    return isNotExpired;
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
     // console.log('getUserRole: No hay token');
      return null;
    }
    const decoded = this.decodeToken(token);
    if (decoded) {
      const role = decoded.rol || null;
      //console.log('getUserRole: Rol decodificado:', role);
      return role;
    }
    //console.log('getUserRole: Error al decodificar token');
    return null;
  }

  // Cerrar sesión
  logout(): void {
   // console.log('Cerrando sesión, eliminando token');
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
}
