import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* import { AuthGuard } from '../../core/guards/auth.guard';
 */
import { FormsModule } from '@angular/forms';
import { ListarEjercicioComponent } from './listar-ejercicio.component';

const routes: Routes = [
  { path: '', component: ListarEjercicioComponent }
];

@NgModule({
  declarations: [
    ListarEjercicioComponent

  ],
  imports: [
     CommonModule,
     RouterModule.forChild(routes),
     FormsModule
  ]
})
export class ListarEjercicioModule {}
