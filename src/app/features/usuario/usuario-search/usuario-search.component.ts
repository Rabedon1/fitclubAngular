import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioDto } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-search',
  templateUrl: './usuario-search.component.html',
  styleUrls: ['./usuario-search.component.css'],
  standalone: false
})
export class UsuarioSearchComponent implements OnInit {
  searchForm: FormGroup;
  usuario: UsuarioDto | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.searchForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  buscarUsuario(): void {
    if (this.searchForm.valid) {
      const correo = this.searchForm.get('correo')?.value;
      this.usuarioService.obtenerPorCorreo(correo).subscribe({
        next: (data) => {
          this.usuario = data;
          this.error = null;
        },
        error: (err) => {
          this.error = 'Usuario no encontrado';
          this.usuario = null;
          console.error(err);
        }
      });
    }
  }
}
