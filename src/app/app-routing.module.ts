import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/login/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule) },
  {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  {path: 'explore', loadChildren: () => import('./features/explore/explore.module').then(m => m.ExploreModule) },
  {path: 'usuarios', loadChildren: () => import('./features/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
