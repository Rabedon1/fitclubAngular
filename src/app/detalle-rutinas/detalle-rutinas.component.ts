import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaDetalle } from '../features/interfaces/rutina';
import { RutinaService } from '../features/services/rutina.service';
import { DetalleEjercicioExpandido } from '../features/interfaces/ejercicio';
import { EjercicioService } from '../features/services/ejercicio.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-rutinas',
  standalone: false,
  templateUrl: './detalle-rutinas.component.html',
  styleUrl: './detalle-rutinas.component.css'
})
export class DetalleRutinasComponent implements OnInit {
  rutina!: RutinaDetalle;
    ejerciciosDetallados: DetalleEjercicioExpandido[] = [];


  constructor(
    private route: ActivatedRoute,
    private rutinaService: RutinaService,
        private ejercicioService: EjercicioService,
        private sanitizer: DomSanitizer,

    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinaService.obtenerRutina(id).subscribe({
      next: data => {
        this.rutina = data;

        // Por cada ejercicio, consultar su detalle y gif
        data.ejercicios.forEach(ejercicioBasico => {
          this.ejercicioService.obtenerEjercicio(ejercicioBasico.ejercicioId).subscribe({
            next: ejercicioDetallado => {
              let detalle: DetalleEjercicioExpandido = {
                ejercicio: ejercicioDetallado,
                gifUrl: null
              };

              this.ejercicioService.obtenerGif(ejercicioDetallado.id).subscribe({
                next: blob => {
                  detalle.gifUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
                  this.ejerciciosDetallados.push(detalle);
                },
                error: () => this.ejerciciosDetallados.push(detalle) // igual se agrega sin gif
              });
            }
          });
        });
      }
    });
  }

  volver() {
    this.router.navigate(['/rutinas']);
  }
}
