import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../features/interfaces/ejercicio';
import { ActivatedRoute, Router } from '@angular/router';
import { EjercicioService } from '../features/services/ejercicio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detalle-ejercicio',
  standalone: false,
  templateUrl: './detalle-ejercicio.component.html',
  styleUrl: './detalle-ejercicio.component.css'
})
export class DetalleEjercicioComponent implements OnInit {
  ejercicio?: Ejercicio;
  gifUrl: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ejercicioService: EjercicioService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ejercicioService.obtenerEjercicio(id).subscribe({
      next: (data) => this.ejercicio = data
    });

    this.ejercicioService.obtenerGif(id).subscribe(blob => {
      this.gifUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
  }

  volver() {
    this.router.navigateByUrl('/ejercicios');
  }
}