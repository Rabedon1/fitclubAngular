import { Component, OnInit } from '@angular/core';
import { Musculo } from '../features/interfaces/musculo';
import { MusculoService } from '../features/services/musculo.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-musculos',
  standalone: false,
  //imports: [FormsModule],
  templateUrl: './musculos.component.html',
  styleUrl: './musculos.component.css'
})
export class MusculosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre'];
  musculos: Musculo[] = [];
  nombre = '';
  error: string = '';

  constructor(
    private musculoService: MusculoService,
  ) { }

  ngOnInit() {
    this.obtenerMusculos();
  }

  obtenerMusculos() {
    this.musculoService.obtenerMusculos().subscribe({
      next: (data) => this.musculos = data,
      error: (err) => this.error = err.message
    })
  }

  registrarMusculo() {
    if (this.nombre.trim()) {
      this.musculoService.registrarMusculo(this.nombre).subscribe({
        next: (nuevoMusculo) => {
          this.musculos.push(nuevoMusculo);
          this.nombre = ''; // limpia el input
          this.error = '';
        },
        error: (err) => this.error = err.message
      });
    } else {
      this.error = 'El nombre no puede estar vacío';
    }
  }

}
