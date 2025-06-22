import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../features/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Verificar rol
    const requiredRole = route.data['role'] as string;
    const userRole = this.authService.getUserRole();

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['forbidden']);
      return false;
    }

    return true;
  }
}

