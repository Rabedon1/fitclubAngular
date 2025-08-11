import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface HistorialCorporalDto {
  idUsuario: number;
  pesoKg: number;
}

export interface HistorialCorporalResponseDto {
  idHistorial: number;
  fechaControl: string;
  pesoKg: number;
  nombreUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialCorporalService {
  private apiUrl = 'https://backend-gimnasio-v1.onrender.com/api/historial-corporal'; // Cambia TU_URL_BACKEND por tu URL real

  constructor(private http: HttpClient) {}

  listarPorUsuario(idUsuario: number): Observable<HistorialCorporalResponseDto[]> {
    return this.http.get<HistorialCorporalResponseDto[]>(`${this.apiUrl}/usuarios/${idUsuario}`);
  }

  crear(dto: HistorialCorporalDto): Observable<HistorialCorporalResponseDto> {
    return this.http.post<HistorialCorporalResponseDto>(this.apiUrl, dto);
  }
}
