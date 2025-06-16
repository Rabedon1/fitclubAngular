import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UpdateUserRequestDto } from '../../interfaces/usuario';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
  standalone: false
})
export class UsuarioEditComponent implements OnInit {
  editForm: FormGroup;
  error: string | null = null;
  id: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Cargar datos del usuario si es necesario
  }

  actualizarUsuario(): void {
    if (this.editForm.valid) {
      const request: UpdateUserRequestDto = this.editForm.value;
      this.usuarioService.actualizarUsuario(this.id, request).subscribe({
        next: () => this.router.navigate(['/usuarios/list']),
        error: (err) => {
          this.error = 'Error al actualizar usuario';
          console.error(err);
        }
      });
    }
  }
}
