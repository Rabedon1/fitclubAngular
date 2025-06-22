import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioSearchComponent } from './usuario-search/usuario-search.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
/* import { AuthGuard } from '../../core/guards/auth.guard';
 */
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UsuarioListComponent },
  { path: 'search', component: UsuarioSearchComponent},
  { path: 'edit/:id', component: UsuarioEditComponent}
];

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioSearchComponent,
    UsuarioEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule {}
