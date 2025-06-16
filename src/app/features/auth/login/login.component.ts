import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginCredentials } from '../interfaces/auth';


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
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = { text: '', type: null };
    const credentials: LoginCredentials = this.loginForm.value;
this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login exitoso:', response); // Depuración
        this.message = { text: 'Login exitoso, redirigiendo...', type: 'success' };
        // La redirección se maneja en AuthService
      },
      error: (err) => {
        this.loading = false;
        console.error('Error en login:', err); // Depuración
        this.message = { text: err.error?.message || 'Credenciales inválidas', type: 'error' };
      }
    });
  }
}
