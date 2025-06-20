

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';

const routes: Routes = [
  { path: '', component: ExploreComponent }
];

@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExploreModule { }
