import { Component } from '@angular/core';
import { RutinaService } from '../features/services/rutina.service';
import { Rutina } from '../features/interfaces/rutina';
import { Router } from '@angular/router';
import { AuthService } from '../features/auth/service/auth.service';
import { Musculo } from '../features/interfaces/musculo';
import { MusculoService } from '../features/services/musculo.service';

@Component({
  selector: 'app-listar-rutinas',
  standalone: false,
  templateUrl: './listar-rutinas.component.html',
  styleUrl: './listar-rutinas.component.css'
})
export class ListarRutinasComponent {
  rutinas: Rutina[] = [];
  rutinasFiltradas: Rutina[] = [];

  musculos: Musculo[] = [];

  musculoSeleccionado: string = 'TODOS';


  terminoBusqueda: string = '';
  cantidadFiltro: string = '';
  rol: string | null = null;

  constructor(
    private rutinaService: RutinaService,
    private router: Router,
    private authService: AuthService,
    private musculoService: MusculoService

  ) { }

  ngOnInit() {
    this.rol = this.authService.getUserRole();

    // Cargar todos los músculos desde el backend
    this.musculoService.obtenerMusculos().subscribe({
      next: data => {
        this.musculos = data;
      },
      error: err => console.error('Error al obtener músculos', err)
    });

    // Cargar todas las rutinas
    this.rutinaService.listarRutinas().subscribe({
      next: data => {
        this.rutinas = data;
        this.rutinasFiltradas = data;
      }
    });
  }
  filtrarRutinas() {
    const termino = this.terminoBusqueda.toLowerCase();

    if (this.musculoSeleccionado !== 'TODOS') {
      const idMusculo = Number(this.musculoSeleccionado);
      this.rutinaService.buscarPorMusculo(idMusculo).subscribe({
        next: data => {
          this.rutinasFiltradas = this.aplicarFiltrosLocales(data, termino);
        },
        error: err => console.error('Error al filtrar por músculo', err)
      });
    } else {
      // Usamos la lista completa original
      this.rutinaService.listarRutinas().subscribe({
        next: data => {
          this.rutinas = data;
          this.rutinasFiltradas = this.aplicarFiltrosLocales(data, termino);
        },
        error: err => console.error('Error al listar todas las rutinas', err)
      });
    }
  }

  private aplicarFiltrosLocales(lista: Rutina[], termino: string): Rutina[] {
    return lista.filter(rutina => {
      const coincideNombre = rutina.nombre.toLowerCase().includes(termino);
      const cantidad = rutina.cantidadEjercicios;

      let coincideCantidad = true;
      if (this.cantidadFiltro === '1') coincideCantidad = cantidad === 1;
      else if (this.cantidadFiltro === '2') coincideCantidad = cantidad === 2;
      else if (this.cantidadFiltro === '3') coincideCantidad = cantidad === 3;
      else if (this.cantidadFiltro === '4+') coincideCantidad = cantidad >= 4;

      return coincideNombre && coincideCantidad;
    });
  }


  verDetalle(id: number) {
    this.router.navigate(['/rutina', id]);
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
