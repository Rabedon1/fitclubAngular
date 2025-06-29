import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';*/
import { CrearEjercicioComponent } from './crear-ejercicio.component';

const routes: Routes = [
    { path: '', component: CrearEjercicioComponent }
];

@NgModule({
    declarations: [
        CrearEjercicioComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)  // 👈 Asegúrate de que esté así


    ]
})
export class CrearEjercicioModule { }
