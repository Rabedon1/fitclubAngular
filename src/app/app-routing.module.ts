import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/login/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'eventos', canActivate: [AuthGuard], loadChildren: () => import('./lista-eventos/lista-eventos.module').then(m => m.ListaEventosModule) },
  { path: 'evento', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./crear-evento/crear-evento.module').then(m => m.CrearEventoModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'explore', canActivate: [AuthGuard], loadChildren: () => import('./features/explore/explore.module').then(m => m.ExploreModule) },
  { path: 'usuarios', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./features/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'membresia', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./features/membresia/membresia.module').then(m => m.MembresiaCreateModule) },
  { path: 'home-admin', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./features/home-admin/home-admin.module').then(m => m.HomeAdminModule) },
  { path: 'forbidden', loadChildren: () => import('./features/forbidden/forbidden.module').then(m => m.ForbiddenModule) },
  { path: 'musculos', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./musculos/musculos.module').then(m => m.MusculosModule) },
  { path: 'crearEjercicio', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./crear-ejercicio/crear-ejercicio.module').then(m => m.CrearEjercicioModule) },
  { path: 'ejercicios', canActivate: [AuthGuard], loadChildren: () => import('./listar-ejercicio/listar-ejercicio.module').then(m => m.ListarEjercicioModule) },
  { path: 'ejercicio/:id', canActivate: [AuthGuard], loadChildren: () => import('./detalle-ejercicio/detaller-ejercicio.module').then(m => m.DetalleEjercicioModule) },
  { path: 'rutinas', canActivate: [AuthGuard], loadChildren: () => import('./listar-rutinas/listar-rutinas.module').then(m => m.ListarRutinasModule) },
  { path: 'rutina/:id', canActivate: [AuthGuard], loadChildren: () => import('./detalle-rutinas/detaller-rutinas.module').then(m => m.DetalleRutinasModule) },
  { path: 'crearRutina', canActivate: [AuthGuard], data: { role: 'ADMINISTRADOR' }, loadChildren: () => import('./crear-rutinas/crear-rutinas.module').then(m => m.CrearRutinasModule) },
  { path: 'bodymap', canActivate: [AuthGuard], loadChildren: () => import('./body-map/body-map.module').then(m => m.BodyMapModule) },

  /*   {path: 'historial-membresia', loadChildren: () => import('./features/historial-membresia/historial-membresias.module').then(m => m.HistorialMembresiasModule) },
 */  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
