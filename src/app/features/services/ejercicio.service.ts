import { Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Ejercicio } from '../interfaces/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = `${environment.apiUrl}/api/ejercicios`;

  constructor(private http: HttpClient) {}

  crearEjercicio(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEjercicio(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerGif(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/gif`, { responseType: 'blob' });
  }

  private handleError(error: HttpErrorResponse) {
    let msg = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(msg));
  }
}
