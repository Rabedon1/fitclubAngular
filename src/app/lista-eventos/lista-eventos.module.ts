import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';*/
import { ListaEventosComponent } from './lista-eventos.component';

const routes: Routes = [
  { path: '', component: ListaEventosComponent }
];

@NgModule({
  declarations: [
    ListaEventosComponent

  ],
  imports: [
     CommonModule,
     RouterModule.forChild(routes)
  ]
})
export class ListaEventosModule {}
