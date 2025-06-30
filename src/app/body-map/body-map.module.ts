import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';*/
import { BodyMapComponent } from './body-map.component';

const routes: Routes = [
    { path: '', component: BodyMapComponent }
];

@NgModule({
    declarations: [
        BodyMapComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)  // 👈 Asegúrate de que esté así


    ]
})
export class BodyMapModule { }
