import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembresiaService } from '../../services/membresia.service';
import { MembresiaDto } from '../../interfaces/membresia';

@Component({
  selector: 'app-membresia-create',
  templateUrl: './membresia-create.component.html',
  styleUrls: ['./membresia-create.component.css'],
  standalone: false
})
export class MembresiaCreateComponent {
  createForm: FormGroup;
  error: string | null = null;
  loading = false;
  vigenciaOptions = ['15 dias', '365 dias', '1 mes', '3 meses', '6 meses', '9 meses', '12 meses'];

  constructor(
    private fb: FormBuilder,
    private membresiaService: MembresiaService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      nombreMembresia: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      vigencia: ['', Validators.required]
    });
  }

  crearMembresia(): void {
    if (this.createForm.valid) {
      this.loading = true;
      this.error = null;
      const dto: MembresiaDto = {
        nombreMembresia: this.createForm.get('nombreMembresia')?.value.trim(),
        descripcion: this.createForm.get('descripcion')?.value.trim(),
        precio: parseFloat(this.createForm.get('precio')?.value),
        vigencia: this.createForm.get('vigencia')?.value
      };
      console.log('Enviando solicitud POST con datos:', dto);
      this.membresiaService.crearMembresia(dto).subscribe({
        next: (response) => {
          console.log('Membresía creada:', response);
          this.loading = false;
          this.router.navigate(['/membresias/list']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'Error al crear la membresía.';
          console.error('Error en la solicitud POST:', err);
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.createForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['/membresias/list']);
  }
}
