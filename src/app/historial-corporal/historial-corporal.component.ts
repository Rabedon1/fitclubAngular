import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HistorialCorporalService } from '../features/services/historial-corporal.service';
import { HistorialCorporalResponseDto } from '../features/interfaces/historial-corporal';


@Component({
  selector: 'app-historial-corporal',
  templateUrl: './historial-corporal.component.html',
  styleUrls: ['./historial-corporal.component.css'],
  standalone: false
})
export class HistorialCorporalComponent implements OnInit {
  historialForm: FormGroup;
  historiales: HistorialCorporalResponseDto[] = [];
  idUsuarioFiltro: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private historialService: HistorialCorporalService,
    private router: Router
  ) {
    this.historialForm = this.fb.group({
      pesoKg: [null, [Validators.required, Validators.min(0.1)]],
      idUsuario: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.historialService.listarTodos().subscribe({
      next: (data) => {
        this.historiales = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los historiales: ' + (err.error?.message || err.message);
      }
    });
  }

  crearHistorial(): void {
    if (this.historialForm.invalid) return;

    this.historialService.crear(this.historialForm.value).subscribe({
      next: () => {
        alert('Historial creado con éxito');
        this.router.navigate(['/historial-corporal']); // Redirige a la ruta deseada
      },
      error: (err) => {
        this.errorMessage = 'Error al crear historial: ' + (err.error?.message || err.message);
      }
    });
  }

  filtrarPorUsuario(): void {
    if (this.idUsuarioFiltro && this.idUsuarioFiltro > 0) {
      this.historialService.listarHistorialesPorUsuario(this.idUsuarioFiltro).subscribe({
        next: (data) => {
          this.historiales = data;
          this.errorMessage = data.length ? '' : 'No se encontraron historiales para este usuario';
        },
        error: (err) => {
          this.errorMessage = 'Error al filtrar los historiales: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.cargarHistoriales();
    }
  }

  obtenerPorId(id: number): void {
    this.historialService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.historiales = [data];
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener el historial: ' + (err.error?.message || err.message);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
