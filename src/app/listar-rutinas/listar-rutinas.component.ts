import { Component } from '@angular/core';
import { RutinaService } from '../features/services/rutina.service';
import { Rutina } from '../features/interfaces/rutina';
import { Router } from '@angular/router';
import { AuthService } from '../features/auth/service/auth.service';

@Component({
  selector: 'app-listar-rutinas',
  standalone: false,
  templateUrl: './listar-rutinas.component.html',
  styleUrl: './listar-rutinas.component.css'
})
export class ListarRutinasComponent {
  rutinas: Rutina[] = [];
  rol: string | null = null;

  constructor(
    private rutinaService: RutinaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.rol = this.authService.getUserRole();
    this.rutinaService.listarRutinas().subscribe({
      next: data => this.rutinas = data
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/rutina', id]);
  }
}
