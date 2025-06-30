import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';*/
import { CrearRutinasComponent } from './crear-rutinas.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    { path: '', component: CrearRutinasComponent }
];

@NgModule({
    declarations: [
        CrearRutinasComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CommonModule,     // Necesario para *ngIf, *ngFor, etc.
        FormsModule,      // Necesario para [(ngModel)]
        RouterModule.forChild(routes)  // 👈 Asegúrate de que esté así


    ]
})
export class CrearRutinasModule { }
