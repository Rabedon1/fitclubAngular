import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  message: { text: string; type: 'success' | 'error' | null } = { text: '', type: null };

  // Lista de roles
  roles = [
    { idRol: 1, nombre: 'Administrador' },
    { idRol: 2, nombre: 'Usuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {
    this.registerForm = this.fb.group({
      idRol: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = { text: '', type: null };
    const formValue = this.registerForm.value;
    const user = {
      rol: { idRol: formValue.idRol },
      cedula: formValue.cedula,
      nombres: formValue.nombres,
      apellidos: formValue.apellidos,
      fechaNacimiento: formValue.fechaNacimiento,
      fechaIngreso: formValue.fechaIngreso,
      edad: formValue.edad,
      correo: formValue.correo,
      telefono: formValue.telefono,
      contrasena: formValue.contrasena
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        this.message = { text: 'Registro realizado con éxito', type: 'success' };
         setTimeout(() => this.router.navigate(['/home-admin']), 2000);
        this.loading = false;
        this.registerForm.reset();


      },
      error: (err) => {
        this.message = { text: 'Error en el registro. Verifica los datos.', type: 'error' };
        this.loading = false;
      }
    });
  }
    goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.logout();
  }


}




