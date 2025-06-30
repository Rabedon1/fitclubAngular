import { Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CrearRutinaDTO, Rutina, RutinaDetalle } from '../interfaces/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private apiUrl = `${environment.apiUrl}/api/rutinas`;

  constructor(private http: HttpClient) {}

  listarRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  obtenerRutina(id: number): Observable<RutinaDetalle> {
    return this.http.get<RutinaDetalle>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  crearRutina(dto: CrearRutinaDTO): Observable<RutinaDetalle> {
    return this.http.post<RutinaDetalle>(this.apiUrl, dto)
      .pipe(catchError(this.handleError));
  }

  buscarPorMusculo(idMusculo: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/buscar-por-musculo/${idMusculo}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
