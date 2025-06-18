import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembresiaCreateComponent } from './membresia-create/membresia-create.component';
import { MembresiaEditComponent } from './membresia-edit/membresia-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'membresia', pathMatch: 'full' },
  { path: 'membresia', component: MembresiaCreateComponent },
  { path: 'edit/:id', component: MembresiaEditComponent }

];

@NgModule({
  declarations: [
    MembresiaCreateComponent,
    MembresiaEditComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembresiaCreateModule { }
