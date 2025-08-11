import { Component, OnInit } from '@angular/core';
import { HistorialCorporalService, HistorialCorporalDto, HistorialCorporalResponseDto } from '../features/services/historial-corporal.service';
import { AuthService } from '../features/auth/service/auth.service';
import { UsuarioService } from '../features/services/usuario.service';


@Component({
  selector: 'app-historial-corporal',
  standalone: false,
  templateUrl: './historial-corporal.component.html',
  styleUrl: './historial-corporal.component.css'
})
export class HistorialCorporalComponent implements OnInit {
  historiales: HistorialCorporalResponseDto[] = [];
  pesoKg: number = 0;
  idUsuario: number | null = null;

  constructor(
    private historialService: HistorialCorporalService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    let correo: string | null = null;
    if (token) {
      const decoded = this.authService.decodeToken(token);
      if (decoded && decoded.sub) {
        correo = decoded.sub;
      }
    }
    if (correo) {
      this.usuarioService.obtenerPorCorreo(correo).subscribe({
        next: usuario => {
          this.idUsuario = usuario.idUsuario;
          this.cargarHistorial();
        }
      });
    }
  }

  cargarHistorial() {
    if (this.idUsuario) {
      this.historialService.listarPorUsuario(this.idUsuario).subscribe({
        next: historiales => this.historiales = historiales
      });
    }
  }

  registrarHistorial() {
    if (this.idUsuario && this.pesoKg > 0) {
      const dto: HistorialCorporalDto = { idUsuario: this.idUsuario, pesoKg: this.pesoKg };
      this.historialService.crear(dto).subscribe({
        next: () => {
          this.pesoKg = 0;
          this.cargarHistorial();
        }
      });
    }
  }
}