//Importaciones de los modulos necesarios

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdministradorComponent } from './administrador/administrador.component';
import { HeaderAComponent } from './administrador/header-a/header-a.component';
import { FooterAComponent } from './administrador/footer-a/footer-a.component';
import { MenuAComponent } from './administrador/menu-a/menu-a.component';
import { EquipoAComponent } from './administrador/equipo-a/equipo-a.component';
import { JugadorAComponent } from './administrador/jugador-a/jugador-a.component';
import { LoginAComponent } from './administrador/login-a/login-a.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { HeaderUComponent } from './usuario/header-u/header-u.component';
import { FooterUComponent } from './usuario/footer-u/footer-u.component';
import { MenuUComponent } from './usuario/menu-u/menu-u.component';
import { InicioUComponent } from './usuario/inicio-u/inicio-u.component';
import { EquipoUComponent } from './usuario/equipo-u/equipo-u.component';
import { JugadorUComponent } from './usuario/jugador-u/jugador-u.component';


import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule

  ],
  declarations: [
    AppComponent,
    MenuAComponent,
    MenuUComponent,
    HeaderUComponent,
    FooterUComponent,
    EquipoUComponent,
    JugadorUComponent,
    HeaderAComponent,
    FooterAComponent,
    EquipoAComponent,
    JugadorAComponent,
    LoginAComponent,
    AdministradorComponent,
    UsuarioComponent,
    InicioUComponent

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
