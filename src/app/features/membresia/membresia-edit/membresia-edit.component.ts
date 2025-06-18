import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresiaService } from '../../services/membresia.service';
import { MembresiaDto } from '../../interfaces/membresia';

@Component({
  selector: 'app-membresia-edit',
  templateUrl: './membresia-edit.component.html',
  styleUrls: ['./membresia-edit.component.css'],
  standalone: false
})
export class MembresiaEditComponent implements OnInit {
  editForm: FormGroup;
  error: string | null = null;
  loading = false;
  id: number;
  vigenciaOptions = ['15 dias', '365 dias', '1 mes', '3 meses', '6 meses', '9 meses', '12 meses'];

  constructor(
    private fb: FormBuilder,
    private membresiaService: MembresiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')! || 0;
    this.editForm = this.fb.group({
      nombreMembresia: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      vigencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.id <= 0) {
      this.error = 'ID de membresía inválido.';
      return;
    }
    this.loading = true;
    this.membresiaService.obtenerMembresiaPorId(this.id).subscribe({
      next: (membresia) => {
        console.log('Datos cargados:', membresia);
        this.editForm.patchValue({
          nombreMembresia: membresia.nombreMembresia,
          descripcion: membresia.descripcion,
          precio: membresia.precio,
          vigencia: membresia.vigencia
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error al cargar la membresía.';
        this.loading = false;
        console.error('Error al cargar membresía:', err);
      }
    });
  }

  editarMembresia(): void {
    if (this.editForm.valid) {
      this.loading = true;
      this.error = null;
      const dto: MembresiaDto = {
        nombreMembresia: this.editForm.get('nombreMembresia')?.value.trim(),
        descripcion: this.editForm.get('descripcion')?.value.trim(),
        precio: parseFloat(this.editForm.get('precio')?.value),
        vigencia: this.editForm.get('vigencia')?.value
      };
      console.log('Enviando solicitud PUT con datos:', dto);
      this.membresiaService.editarMembresia(this.id, dto).subscribe({
        next: (response) => {
          console.log('Membresía actualizada:', response);
          this.loading = false;

        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'Error al actualizar la membresía.';
          console.error('Error en la solicitud PUT:', err);
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.editForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['/membresias/list']);
  }
}
