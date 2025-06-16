import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials, User, LoginResponse, DecodedToken } from '../interfaces/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  //manda las credenciales de inicio de sesión al servidor y devuelve un observable con la respuesta
  //El observable se puede suscribir para recibir la respuesta cuando esté disponible
  //El método `login` envía una solicitud POST al servidor con las credenciales del usuario
  //y guarda el token de autenticación en el almacenamiento local si la respuesta es exitosa.
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      //cuando llega la respuesta del servidor, se ejecuta el siguiente código, hace esto(tap)
      tap((response: LoginResponse) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
         } // Redirigir al usuario a la página principal
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
    return localStorage.getItem('token');
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
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    // Verificar si el token no ha expirado
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    const decoded = this.decodeToken(this.getToken() || '');
    return decoded ? decoded.rol : null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
