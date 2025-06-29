import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../features/interfaces/ejercicio';
import { EjercicioService } from '../features/services/ejercicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-ejercicio',
  standalone: false,
  templateUrl: './listar-ejercicio.component.html',
  styleUrl: './listar-ejercicio.component.css'
})
export class ListarEjercicioComponent implements OnInit {
  ejercicios: Ejercicio[] = [];

  constructor(private ejercicioService: EjercicioService, private router: Router) { }

  ngOnInit(): void {
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
