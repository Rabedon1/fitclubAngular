// evento.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoDto } from '../interfaces/evento';

@Injectable({ providedIn: 'root' })
export class EventoService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'https://backend-gimnasio-v1.onrender.com/api/eventos';

  crearEvento(evento: EventoDto) {
    return this.http.post(`${this.baseUrl}`, evento);
  }


  agregarUsuarioAEvento(idEvento: number, idUsuario: number) {
    return this.http.post(`${this.baseUrl}/${idEvento}/agregar-usuario/${idUsuario}`, {});
  }

  obtenerCupoActual(idEvento: number) {
    return this.http.get<{ cuposDisponibles: number }>(`${this.baseUrl}/${idEvento}/cupos`);
  }

  obtenerTodosEventos(): Observable<EventoDto[]> {
    return this.http.get<EventoDto[]>(this.baseUrl);
  }
}