import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginCredentials, DecodedToken } from '../interfaces/auth';

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
     // console.log('Formulario inválido, marcando campos como tocados');
      this.loginForm.markAllAsTouched();
      this.message = { text: 'Por favor, completa todos los campos correctamente', type: 'error' };
      return;
    }

    this.loading = true;
    this.message = { text: '', type: null };
    const credentials: LoginCredentials = this.loginForm.value;
   // console.log('Intentando login con:', credentials.correo);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false;
       // console.log('Login exitoso:', response);

        // Determinar la ruta de redirección según el rol
        const token = this.authService.getToken();
        let redirectUrl = '/home';
        // Por defecto para usuario
        if (token) {
          const decoded: DecodedToken | null = this.authService.decodeToken(token);
          if (decoded && decoded.rol === 'ADMINISTRADOR') {
           // console.log('Login con admin:', response);
            redirectUrl = '/home-admin';

          }
        }

        this.message = { text: `Ingreso al sistema con éxito`, type: 'success' };

        // Redirigir después de 2 segundos para mostrar el mensaje
        setTimeout(() => {
          this.router.navigate([redirectUrl]);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
       // console.error('Error en login:', err);
        this.message = { text: err.error?.message || 'Credenciales inválidas', type: 'error' };
      }
    });
  }
}
