/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistorialMembresiaActivaDto, HistorialMembresiaDto } from '../interfaces/membresia';
import { MembresiaService } from '../services/membresia.service';

@Component({
  selector: 'app-historial-membresia',
  templateUrl: './historial-membresia.component.html',
  styleUrls: ['./historial-membresia.component.css'],
  standalone: false
})
export class HistorialMembresiaComponent implements OnInit {
  historialForm: FormGroup;
  membresiaActiva: HistorialMembresiaActivaDto | null = null;
  error: string | null = null;
  loading = false;
  idUsuario: number;

  constructor(
    private fb: FormBuilder,
    private membresiaService: MembresiaService,
    private route: ActivatedRoute
  ) {
    this.idUsuario = +this.route.snapshot.paramMap.get('idUsuario')! || 0;
    console.log('HistorialMembresiaComponent: ID usuario:', this.idUsuario);
    this.historialForm = this.fb.group({
      idMembresia: ['', [Validators.required, Validators.min(1)]],
      valorPagado: ['', [Validators.required, Validators.min(0)]],
      estado: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarMembresiaActiva();
  }

  cargarMembresiaActiva(): void {
    this.loading = true;
    this.membresiaService.obtenerMembresiaActiva(this.idUsuario).subscribe({
      next: (dto) => {
        console.log('Membresía activa cargada:', dto);
        this.membresiaActiva = dto;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'No se encontró una membresía activa';
        console.error('Error al cargar membresía activa:', err);
        this.loading = false;
      }
    });
  }

  registrarHistorial(): void {
    console.log('registrarHistorial llamado', this.historialForm.value);
    if (this.historialForm.valid) {
      this.loading = true;
      this.error = null;
      const dto: HistorialMembresiaDto = {
        idUsuario: this.idUsuario,
        idMembresia: +this.historialForm.get('idMembresia')?.value,
        valorPagado: +this.historialForm.get('valorPagado')?.value,
        estado: this.historialForm.get('estado')?.value
      };
      console.log('Enviando solicitud POST con datos:', dto);
      this.membresiaService.registrarHistorial(dto).subscribe({
        next: (response) => {
          console.log('Historial registrado:', response);
          this.loading = false;
          this.cargarMembresiaActiva();
          this.historialForm.reset({ estado: true });
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'Error al registrar historial';
          console.error('Error en la solicitud POST:', err);
        }
      });
    } else {
      console.log('Formulario inválido:', this.historialForm.errors);
      this.error = 'Por favor, completa todos los campos correctamente';
      this.historialForm.markAllAsTouched();
    }
  }
}
 */
