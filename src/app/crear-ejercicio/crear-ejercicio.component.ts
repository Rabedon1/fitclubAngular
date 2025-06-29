import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../features/services/ejercicio.service';
import { Musculo } from '../features/interfaces/musculo';
import { MusculoService } from '../features/services/musculo.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-crear-ejercicio',
  standalone: false,
  templateUrl: './crear-ejercicio.component.html',
  styleUrl: './crear-ejercicio.component.css'
})
export class CrearEjercicioComponent implements OnInit {
  nombre = '';
  descripcion = '';
  gif!: File;
  musculosDisponibles: Musculo[] = [];
  musculoSeleccionados: number[] = [];

  mensaje = '';
  error = '';

  constructor(
    private ejercicioService: EjercicioService,
    private musculoService: MusculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.musculoService.obtenerMusculos().subscribe({
      next: (data) => this.musculosDisponibles = data
    });
  }

  onFileSelected(event: any) {
    this.gif = event.target.files[0];
  }

  toggleMusculo(id: number) {
    if (this.musculoSeleccionados.includes(id)) {
      this.musculoSeleccionados = this.musculoSeleccionados.filter(m => m !== id);
    } else {
      this.musculoSeleccionados.push(id);
    }
  }

  registrar() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('gif', this.gif);
    this.musculoSeleccionados.forEach(id => formData.append('musculoIds', id.toString()));

    this.ejercicioService.crearEjercicio(formData).subscribe({
      next: () => this.router.navigate(['/ejercicios/']),
      error: (err) => this.error = err.message
    });
  }
}