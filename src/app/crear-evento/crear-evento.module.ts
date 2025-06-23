import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import { AuthGuard } from '../../core/guards/auth.guard';*/
import { CrearEventoComponent } from './crear-evento.component';

const routes: Routes = [
    { path: '', component: CrearEventoComponent }
];

@NgModule({
    declarations: [
        CrearEventoComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)  // 👈 Asegúrate de que esté así


    ]
})
export class CrearEventoModule { }
