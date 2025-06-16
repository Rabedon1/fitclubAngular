import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,


})
export class NavComponent {
 isMenuOpen = false;

 constructor(private authService: AuthService) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false; // Cerrar el menú al hacer logout
  }

}
