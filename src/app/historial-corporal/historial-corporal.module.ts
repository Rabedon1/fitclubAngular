import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialCorporalComponent } from './historial-corporal.component';
/* import { AuthGuard } from '../../core/guards/auth.guard';
 */
const routes: Routes = [
  { path: '', component: HistorialCorporalComponent }
];

@NgModule({
  declarations: [
    HistorialCorporalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HistorialCorporalModule {}
