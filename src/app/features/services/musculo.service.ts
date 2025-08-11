import { Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Musculo } from '../interfaces/musculo';

@Injectable({
  providedIn: 'root'
})
export class MusculoService {
  private apiUrl = `${environment.apiUrl}/api/musculos`;
  // private apiUrl = `${environment.apiUrl}/gimnasio/api/musculos`;

  constructor(private http: HttpClient) { }

  registrarMusculo(nombre: string): Observable<Musculo> {
    return this.http.post<Musculo>(this.apiUrl, { nombre })
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerMusculos(): Observable<Musculo[]> {
    return this.http.get<Musculo[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMsg = `Error ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
