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
