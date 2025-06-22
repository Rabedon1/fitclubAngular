import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UpdateUserRequestDto, UsuarioDto } from '../../interfaces/usuario';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { Location } from '@angular/common';


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
  correo: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')! || 0;
    console.log('UsuarioEditComponent: ID de la ruta:', this.id);
    this.editForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      idRol: ['', [Validators.required, Validators.pattern(/^[1-2]$/)]]
    });
  }

  ngOnInit(): void {
    // Suscribirse a los query params para obtener el correo
    this.route.queryParams.subscribe(params => {
      console.log('Query params recibidos:', params);
      this.correo = params['correo'] || null;
      console.log('Correo extraído:', this.correo);

      if (!this.correo) {
        this.error = 'Correo no proporcionado';
        console.error('Correo no especificado en los parámetros de la ruta');
        return;
      }

      // Cargar datos del usuario por correo
      console.log('Cargando datos del usuario para correo:', this.correo);
      this.usuarioService.obtenerPorCorreo(this.correo).subscribe({
        next: (usuario: UsuarioDto) => {
          console.log('Datos cargados:', usuario);
          this.editForm.patchValue({
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            telefono: usuario.telefono,
            edad: usuario.edad,
            cedula: usuario.cedula,
            idRol: usuario.idRol
          });
          // Verificar que el ID coincide
          if (usuario.idUsuario && usuario.idUsuario !== this.id) {
            this.error = 'El ID de la ruta no coincide con el usuario';
            console.error('ID mismatch:', usuario.idUsuario, this.id);
          }
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del usuario';
          console.error('Error en obtenerPorCorreo:', err);
        }
      });
    });
  }

  actualizarUsuario(): void {
    console.log('actualizarUsuario llamado', this.editForm.value);
    if (this.editForm.valid) {
      const request: UpdateUserRequestDto = {
        idUsuario: this.id,
        nombres: this.editForm.get('nombres')?.value,
        apellidos: this.editForm.get('apellidos')?.value,
        correo: this.editForm.get('correo')?.value,
        telefono: this.editForm.get('telefono')?.value,
        edad: +this.editForm.get('edad')?.value,
        cedula: this.editForm.get('cedula')?.value,
        idRol: +this.editForm.get('idRol')?.value
      };
      console.log('Enviando solicitud PUT con datos:', request);
      this.usuarioService.actualizarUsuario(this.id, request).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);

          this.router.navigate(['/usuarios/list']);
        },
        error: (err) => {

          console.error('Error en la solicitud PUT:', err);
          this.router.navigate(['/usuarios/list']);
        }
      });
    } else {
      console.log('Formulario inválido:', this.editForm.errors);
      this.error = 'Por favor, completa todos los campos correctamente';
      this.editForm.markAllAsTouched();
    }
  }

  cedulaEcuatorianaValidator(control: AbstractControl): { [key: string]: any } | null {
  const cedula = control.value;
  if (!cedula) return null;

  if (!/^\d{10}$/.test(cedula)) {
    return { formatoInvalido: true };
  }

  const digitos = cedula.split('').map(Number);
  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) {
    return { provinciaInvalida: true };
  }

  const tercerDigito = digitos[2];
  if (tercerDigito >= 6) {
    return { tipoInvalido: true };
  }

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = digitos[i];
    if (i % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }
    suma += valor;
  }

  const digitoVerificador = (10 - (suma % 10)) % 10;
  if (digitoVerificador !== digitos[9]) {
    return { digitoVerificadorInvalido: true };
  }

  return null;
}


  cancelar(): void {
    this.router.navigate(['/home-admin']);
  }
   goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.logout();
  }


}
