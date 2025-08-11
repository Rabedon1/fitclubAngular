import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresiaService } from '../../services/membresia.service';
import { HistorialMembresiaDto, MembresiaDto } from '../../interfaces/membresia';

@Component({
  selector: 'app-membresia-asignar',
  templateUrl: './membresia-asignar.component.html',
  styleUrls: ['./membresia-asignar.component.css'],
  standalone: false
})
export class MembresiaAsignarComponent implements OnInit {
  dto: HistorialMembresiaDto = {
    idUsuario: 0,
    idMembresia: 0,
    valorPagado: 0,
    estado: true
  };
  membresiaSeleccionada?: MembresiaDto;

  membresias: any[] = [];
  idUsuario!: number;

  constructor(
    private membresiaService: MembresiaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUsuario = +this.route.snapshot.paramMap.get('id')!;
    this.dto.idUsuario = this.idUsuario;
    console.log('ID de usuario cargado:', this.idUsuario);

    this.membresiaService.obtenerTodas().subscribe({
      next: (data) => {
        this.membresias = data;
        console.log('Membresías cargadas:', data);
      },
      error: (error) => {
        console.error('Error al cargar las membresías:', error);
        alert('Error al cargar las membresías. Verifica que el servidor esté corriendo y el endpoint sea accesible.');
      }
    });
  }

  onSeleccionarMembresia(id: number) {
    if (!id || id === 0) {
      this.membresiaSeleccionada = undefined;
      return;
    }

    this.membresiaService.obtenerMembresiaPorId(id).subscribe({
      next: (data) => {
        console.log('Membresía seleccionada:', data);
        this.membresiaSeleccionada = data;
      },
      error: (error) => {
        console.error('Error al obtener detalles de la membresía:', error);
        this.membresiaSeleccionada = undefined;
      }
    });
  }

  esValorPagadoInvalido(): boolean {
    const pagado = this.dto.valorPagado;
    const precio = this.membresiaSeleccionada?.precio ?? 0;

    return pagado < 0 || pagado > precio;
  }

  asignarMembresia() {
    console.log('Iniciando asignación de membresía con DTO:', this.dto);
    this.dto.idMembresia = Number(this.dto.idMembresia);

    if (this.dto.idMembresia === 0) {
      alert('Por favor, seleccione una membresía.');
      return;
    }

    if (this.esValorPagadoInvalido()) {
      alert('El valor pagado debe ser mayor o igual a 0 y no puede superar el precio de la membresía.');
      return;
    }

    this.membresiaService.asignarMembresiaUsuario(this.dto).subscribe({
      next: (response) => {
        console.log('Membresía asignada con éxito:', response);
        alert('Membresía asignada con éxito.');
        this.router.navigate(['usuarios', 'list']);
      },
      error: (error) => {
        console.error('Error al asignar membresía:', error);
        let errorMessage = 'Error desconocido. Revisa la consola.';

        if (error.status === 404) {
          errorMessage = `El endpoint no fue encontrado (HTTP 404). Verifica la URL: ${error.url}.`;
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar al servidor. Verifica que el backend esté corriendo.';
        } else if (error.status === 409 && error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        alert(`Error al asignar membresía: ${errorMessage}`);
      }
    });
  }


  goBack(): void {
    this.router.navigate(['usuarios', 'list']);
  }
}
