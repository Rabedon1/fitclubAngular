import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateUserRequestDto, Usuario, UsuarioDto } from '../interfaces/usuario';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  actualizarUsuario(id: number, request: UpdateUserRequestDto): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/edit/${id}`, request)
      .pipe(catchError(this.handleError));
  }

  obtenerTodosLosUsuarios(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  obtenerPorCorreo(correo: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.apiUrl}/usuariosPorEmail/${correo}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}, Mensaje: ${error.error.message || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
