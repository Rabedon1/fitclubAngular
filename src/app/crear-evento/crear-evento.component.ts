import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../features/services/evento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-evento',
  standalone: false,
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css',
})
export class CrearEventoComponent {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder, private eventoService: EventoService, private router: Router) {
    this.eventoForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      descripcion: ['', Validators.required],
      cupoMaximo: [null, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horraFin: ['', Validators.required],
    });
  }

  crearEvento() {
    if (this.eventoForm.invalid) return;

    this.eventoService.crearEvento(this.eventoForm.value).subscribe({
      next: () => {
        alert('Evento creado con éxito');
        this.router.navigate(['/home-admin']); // <--- redirección
      },
      error: (err) =>
        alert('Error al crear evento: ' + (err.error?.message || err.message)),
    });
  }
}