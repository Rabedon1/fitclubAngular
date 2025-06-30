import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../features/interfaces/ejercicio';
import { EjercicioService } from '../features/services/ejercicio.service';
import { Router } from '@angular/router';
import { AuthService } from '../features/auth/service/auth.service';

@Component({
  selector: 'app-listar-ejercicio',
  standalone: false,
  templateUrl: './listar-ejercicio.component.html',
  styleUrl: './listar-ejercicio.component.css'
})
export class ListarEjercicioComponent implements OnInit {
  ejercicios: Ejercicio[] = [];
  rol: string | null = null;


  constructor(private authService: AuthService, private ejercicioService: EjercicioService, private router: Router) { }

  ngOnInit(): void {
    this.rol = this.authService.getUserRole();

    this.ejercicioService.obtenerEjercicios().subscribe({
      next: (data) => this.ejercicios = data
    });

  }

  verDetalle(id: number) {
    this.router.navigate(['/ejercicio', id]);
  }

  irAFormulario() {
    this.router.navigate(['/crearEjercicio']);
  }
}
