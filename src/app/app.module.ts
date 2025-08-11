import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/components/shared.module';
import { NavComponent } from './shared/components/navbar/navbar.component';
import { ExploreComponent } from './features/explore/explore.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { MusculosComponent } from './musculos/musculos.component';
import { CrearEjercicioComponent } from './crear-ejercicio/crear-ejercicio.component';
import { ListarEjercicioComponent } from './listar-ejercicio/listar-ejercicio.component';
import { DetalleEjercicioComponent } from './detalle-ejercicio/detalle-ejercicio.component';
import { ListarRutinasComponent } from './listar-rutinas/listar-rutinas.component';
import { DetalleRutinasComponent } from './detalle-rutinas/detalle-rutinas.component';
import { CrearRutinasComponent } from './crear-rutinas/crear-rutinas.component';
import { BodyMapComponent } from './body-map/body-map.component';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Añadir HttpClientModule
    AppRoutingModule,
    SharedModule

  ],
  providers: [
    provideClientHydration(withEventReplay())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
