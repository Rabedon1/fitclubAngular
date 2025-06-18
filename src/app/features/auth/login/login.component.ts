import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

interface LoginCredentials {
  correo: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  message: { text: string; type: 'success' | 'error' | null } = { text: '', type: null };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    console.log('Formulario inválido, marcando campos como tocados');
    this.loginForm.markAllAsTouched();
    this.message = { text: 'Por favor, completa todos los campos correctamente', type: 'error' };
    return;
  }

  this.loading = true;
  this.message = { text: '', type: null };
  const credentials: LoginCredentials = this.loginForm.value;
  console.log('Intentando login con:', credentials.correo);

  this.authService.login(credentials).subscribe({
    next: (response) => {
      this.loading = false;
      console.log('Login exitoso:', response);
      this.message = { text: 'Login exitoso, redirigiendo...', type: 'success' };

      // Redirigir directamente a /home
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.loading = false;
      console.error('Error en login:', err);
      this.message = { text: err.error?.message || 'Credenciales inválidas', type: 'error' };
    }
  });
}

}
