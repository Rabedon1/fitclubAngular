import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventoService } from '../features/services/evento.service';
import { WebsocketService } from '../features/services/websocket.service';
import { EventoDto } from '../features/interfaces/evento';
@Component({
  selector: 'app-lista-eventos',
  standalone: false,
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit {
  cuposDisponibles: number | null = null;
  eventos: EventoDto[] = [];

  constructor(private eventoService: EventoService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit() {
    // this.eventoService.obtenerCupoActual(2).subscribe(data => {
    //   this.cuposDisponibles = data.cuposDisponibles;
    // });
    this.eventoService.obtenerTodosEventos().subscribe({
      next: (data) => {
        const ahora = new Date();
        this.eventos = data.filter(evento => {
          const fechaHoraEvento = new Date(`${evento.fecha}T${evento.horaInicio}`);
          return fechaHoraEvento >= ahora;
        });
      },
      error: (err) => console.error('Error al cargar eventos', err)
    });
    this.websocketService.getCuposUpdates().subscribe(data => {
      console.log('Datos recibidos por WebSocket:', data);
      const index = this.eventos.findIndex(e => e.idEvento === data.idEvento);
      if (index !== -1) {
        this.eventos[index].cuposDisponibles = data.cuposDisponibles;
      }
    });

  }

  inscribirse(idEvento: number | null) {
    if (idEvento == null) return;

    const idUsuario = 48; // o el ID real desde login

    this.eventoService.agregarUsuarioAEvento(idEvento, idUsuario).subscribe({
      next: () => alert('Inscripción exitosa!'),
      error: (err) => {
        console.error('Error al inscribirse:', err);
        let mensaje = 'Error al inscribirse.';

        // Si el backend devuelve JSON con .message
        if (err.error?.message) {
          mensaje = err.error.message;
        }
        // Si err.error es un string (no parseado)
        else if (typeof err.error === 'string') {
          mensaje = err.error;
        }

        alert(mensaje);
      }
    });
  }


}