import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';
 */import { HomeAdminComponent } from './home-admin.component';

const routes: Routes = [
  { path: '', component: HomeAdminComponent }
];

@NgModule({
  declarations: [
    HomeAdminComponent

  ],
  imports: [
     CommonModule,
     RouterModule.forChild(routes)
  ]
})
export class HomeAdminModule {}
