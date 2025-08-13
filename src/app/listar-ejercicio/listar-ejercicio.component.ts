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
  ejerciciosFiltrados: Ejercicio[] = [];
  musculosDisponibles: string[] = [];

  terminoBusqueda: string = '';
  musculoFiltro: string = '';


  constructor(private authService: AuthService, private ejercicioService: EjercicioService, private router: Router) { }

  ngOnInit(): void {
    this.rol = this.authService.getUserRole();

    this.ejercicioService.obtenerEjercicios().subscribe({
      next: (data) => {
        this.ejercicios = data;
        this.ejerciciosFiltrados = data;

        // Obtener músculos únicos
        const musculosSet = new Set<string>();
        data.forEach(e => e.musculos.forEach(m => musculosSet.add(m)));
        this.musculosDisponibles = Array.from(musculosSet);
      }
    });

  }
  filtrarEjercicios() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio => {
      const coincideNombre = ejercicio.nombre.toLowerCase().includes(termino);
      const coincideMusculo = this.musculoFiltro === '' || ejercicio.musculos.includes(this.musculoFiltro);
      return coincideNombre && coincideMusculo;
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/ejercicio', id]);
  }

  irAFormulario() {
    this.router.navigate(['/crearEjercicio']);
  }
  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
