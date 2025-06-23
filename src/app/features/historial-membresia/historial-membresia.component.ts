import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistorialMembresiaActivaDto, HistorialMembresiaDto, MembresiaDto } from '../interfaces/membresia';
import { MembresiaService } from '../services/membresia.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-membresia',
  templateUrl: './historial-membresia.component.html',
  styleUrls: ['./historial-membresia.component.css'],
  standalone: false
})
export class HistorialMembresiaComponent implements OnInit {

  form: FormGroup;
  membresias: MembresiaDto[] = [];

  constructor(
    private fb: FormBuilder,
    private membresiaService: MembresiaService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      usuarioId: [null, Validators.required],
      membresiaId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.membresiaService.obtenerTodas().subscribe({
      next: (data) => this.membresias = data,
      error: (err) => console.error('Error cargando membresías', err)
    });
  }

  asignar(): void {
    if (this.form.invalid) return;

    const datos = this.form.value;
    console.log('Datos para enviar:', datos);

    // Llama a tu API que asocia usuario con membresía (ajusta la URL)
    this.http.post('http://localhost:8080/api/historial-membresia', datos).subscribe({
      next: () => alert('Membresía asignada correctamente'),
      error: (err) => console.error('Error al asignar membresía', err)
    });
  }
}
