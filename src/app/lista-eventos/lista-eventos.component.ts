import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventoService } from '../features/services/evento.service';
import { WebsocketService } from '../features/services/websocket.service';
import { EventoDto } from '../features/interfaces/evento';
import { AuthService } from '../features/auth/service/auth.service';
import { UsuarioService } from '../features/services/usuario.service';
@Component({
  selector: 'app-lista-eventos',
  standalone: false,
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit {
  cuposDisponibles: number | null = null;
  eventos: EventoDto[] = [];

  constructor(
    private eventoService: EventoService,
    private websocketService: WebsocketService,
    private authService: AuthService,
    private usuarioService: UsuarioService
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
    const token = this.authService.getToken();
    let correo: string | null = null;
    if (token) {
      const decoded = this.authService.decodeToken(token);
      if (decoded && decoded.sub) {
        correo = decoded.sub;
      }
    }
    if (!correo) {
      alert('No se pudo obtener el correo del usuario actual.');
      return;
    }
    this.usuarioService.obtenerPorCorreo(correo).subscribe({
      next: (usuario) => {
        const idUsuario = usuario.idUsuario;
        this.eventoService.agregarUsuarioAEvento(idEvento, idUsuario).subscribe({
          next: () => alert('Inscripción exitosa!'),
          error: (err) => {
            console.error('Error al inscribirse:', err);
            let mensaje = 'Error al inscribirse.';
            if (err.error?.message) {
              mensaje = err.error.message;
            } else if (typeof err.error === 'string') {
              mensaje = err.error;
            }
            alert(mensaje);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener usuario por correo:', err);
        alert('No se pudo obtener el usuario actual.');
      }
    });
  }


}