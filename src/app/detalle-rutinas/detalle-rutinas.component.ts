import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaDetalle } from '../features/interfaces/rutina';
import { RutinaService } from '../features/services/rutina.service';

@Component({
  selector: 'app-detalle-rutinas',
  standalone: false,
  templateUrl: './detalle-rutinas.component.html',
  styleUrl: './detalle-rutinas.component.css'
})
export class DetalleRutinasComponent implements OnInit {
  rutina!: RutinaDetalle;

  constructor(
    private route: ActivatedRoute,
    private rutinaService: RutinaService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinaService.obtenerRutina(id).subscribe({
      next: data => this.rutina = data
    });
  }

  volver() {
    this.router.navigate(['/rutinas']);
  }
}
