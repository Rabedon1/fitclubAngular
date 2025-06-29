import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* import { AuthGuard } from '../../core/guards/auth.guard';
 */
import { MusculosComponent } from './musculos.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MusculosComponent }
];

@NgModule({
  declarations: [
    MusculosComponent

  ],
  imports: [
     CommonModule,
     RouterModule.forChild(routes),
     FormsModule
  ]
})
export class MusculosModule {}
