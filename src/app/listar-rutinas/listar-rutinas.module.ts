import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* import { AuthGuard } from '../../core/guards/auth.guard';
 */
import { FormsModule } from '@angular/forms';
import { ListarRutinasComponent } from './listar-rutinas.component';

const routes: Routes = [
  { path: '', component: ListarRutinasComponent }
];

@NgModule({
  declarations: [
    ListarRutinasComponent

  ],
  imports: [
     CommonModule,
     RouterModule.forChild(routes),
     FormsModule
  ]
})
export class ListarRutinasModule {}
