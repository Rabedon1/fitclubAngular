import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MembresiaDto } from '../interfaces/membresia';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  crearMembresia(dto: MembresiaDto): Observable<MembresiaDto> {
    console.log('Creando membresía:', dto);
    return this.http.post<MembresiaDto>(`${this.apiUrl}/membresias`, dto).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(this.handleError)
    );
  }

  asignarMembresiaUsuario(data: any) {
    return this.http.post(`${this.apiUrl}/historial-membresias`, data);
  }

  editarMembresia(id: number, dto: MembresiaDto): Observable<MembresiaDto> {
    console.log('Editando membresía ID:', id, 'con datos:', dto);
    return this.http.put<MembresiaDto>(`${this.apiUrl}/membresias/${id}`, dto).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(this.handleError)
    );
  }

  obtenerMembresiaPorId(id: number): Observable<MembresiaDto> {
    console.log('Obteniendo membresía ID:', id);
    return this.http.get<MembresiaDto>(`${this.apiUrl}/membresias/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las membresías disponibles
  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/membresias`);
  }




  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error completo:', error);
    console.error('Cuerpo del error:', error.error);
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      const serverMessage = error.error?.message || error.statusText || 'Sin mensaje';
      errorMessage = `Código: ${error.status}, Mensaje: ${serverMessage}`;
      if (error.status === 400) {
        errorMessage = serverMessage;
      } else if (error.status === 401) {
        errorMessage = 'Sesión no autorizada. Por favor, inicia sesión nuevamente.';
      } else if (error.status === 403) {
        errorMessage = 'Acceso denegado: No tienes permisos para realizar esta acción.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      }
    }

    console.error('Mensaje de error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
