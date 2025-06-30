import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../features/interfaces/ejercicio';
import { RutinaService } from '../features/services/rutina.service';
import { EjercicioService } from '../features/services/ejercicio.service';
import { Router } from '@angular/router';
import { CrearRutinaDTO } from '../features/interfaces/rutina';

@Component({
  selector: 'app-crear-rutinas',
  standalone: false,
  templateUrl: './crear-rutinas.component.html',
  styleUrl: './crear-rutinas.component.css'
})
export class CrearRutinasComponent implements OnInit {
  nombre = '';
  descripcion = '';
  ejerciciosDisponibles: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  ejerciciosSeleccionados: {
    ejercicioId: number;
    series: number;
    repeticiones: number;
  }[] = [];

  filtroNombre = '';
  filtroMusculo = '';
  musculos: string[] = [];

  constructor(
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ejercicioService.obtenerEjercicios().subscribe({
      next: (data) => {
        this.ejerciciosDisponibles = data;
        this.ejerciciosFiltrados = data;
        this.musculos = [...new Set(
          data.flatMap(e => e.musculos)  // aplanar todos los músculos
        )];
      }
    });
  }

  getNombreEjercicio(id: number): string {
    return this.ejerciciosDisponibles.find(e => e.id === id)?.nombre || 'Desconocido';
  }

  agregarEjercicio(id: number) {
    const yaExiste = this.ejerciciosSeleccionados.find(e => e.ejercicioId === id);
    if (!yaExiste) {
      this.ejerciciosSeleccionados.push({ ejercicioId: id, series: 3, repeticiones: 10 });
    }
  }

  eliminarEjercicio(id: number) {
    this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(e => e.ejercicioId !== id);
  }

  filtrarEjercicios() {
    this.ejerciciosFiltrados = this.ejerciciosDisponibles.filter(e =>
      e.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      (!this.filtroMusculo || e.musculos.includes(this.filtroMusculo))
    );
  }

  crearRutina() {
    if (!this.nombre.trim() || !this.descripcion.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (this.ejerciciosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un ejercicio.');
      return;
    }

    const dto: CrearRutinaDTO = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      ejercicios: this.ejerciciosSeleccionados
    };

    this.rutinaService.crearRutina(dto).subscribe({
      next: () => this.router.navigate(['/rutinas']),
      error: (err) => alert('Error al crear rutina: ' + err.message)
    });
  }
}
