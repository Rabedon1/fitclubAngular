import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialMembresiaComponent } from './historial-membresia.component';

const routes: Routes = [
  { path: '', redirectTo: 'historial', pathMatch: 'full' },
  { path: 'historial', component: HistorialMembresiaComponent },

];

@NgModule({
  declarations: [
    HistorialMembresiaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HistorialMembresiasModule { }