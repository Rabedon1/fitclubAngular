import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresiaService } from '../../services/membresia.service';
import { HistorialMembresiaDto } from '../../interfaces/membresia';

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

  membresias: any[] = [];
  idUsuario!: number;

  constructor(
    private membresiaService: MembresiaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  asignarMembresia() {
    console.log('Iniciando asignación de membresía con DTO:', this.dto);
    this.dto.idMembresia = Number(this.dto.idMembresia); // Convertir a número
    if (this.dto.idMembresia === 0 || this.dto.valorPagado <= 0) {
      alert('Por favor, seleccione una membresía y especifique un valor pagado válido.');
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
          errorMessage = `El endpoint no fue encontrado (HTTP 404). Verifica la URL: ${error.url}. Asegúrate de que el backend esté corriendo y el endpoint sea correcto.`;
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar al servidor. Verifica que el backend esté corriendo en http://localhost:8080 y que no haya problemas de CORS.';
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
