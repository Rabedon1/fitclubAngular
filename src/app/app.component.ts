import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'fitclub';
  constructor(private router: Router) {}
  shouldShowNav(): boolean {
      return this.router.url !== '/auht/login' && this.router.url !== '/auth/register';
  }
}
