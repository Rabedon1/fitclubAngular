import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialCorporalDto, HistorialCorporalResponseDto } from '../interfaces/historial-corporal';


@Injectable({
  providedIn: 'root'
})
export class HistorialCorporalService {
  private apiUrl = 'https://backend-gimnasio-v1.onrender.com/api/historial-corporal';

  constructor(private http: HttpClient) { }

  crear(historial: HistorialCorporalDto): Observable<HistorialCorporalResponseDto> {
    return this.http.post<HistorialCorporalResponseDto>(this.apiUrl, historial);
  }

  listarTodos(): Observable<HistorialCorporalResponseDto[]> {
    return this.http.get<HistorialCorporalResponseDto[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<HistorialCorporalResponseDto> {
    return this.http.get<HistorialCorporalResponseDto>(`${this.apiUrl}/${id}`);
  }

  listarHistorialesPorUsuario(idUsuario: number): Observable<HistorialCorporalResponseDto[]> {
    return this.http.get<HistorialCorporalResponseDto[]>(`${this.apiUrl}/usuarios/${idUsuario}`);
  }
}
