import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'fitclub';
  constructor(private router: Router, public authService: AuthService) {}
  shouldShowNav(): boolean {
      return this.router.url !== '/auht/login' && this.router.url !== '/auth/register';
  }
}
