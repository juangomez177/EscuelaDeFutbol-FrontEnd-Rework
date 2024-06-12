import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { AdministradorComponent } from './administrador/administrador.component';
import { EquipoAComponent } from './administrador/equipo-a/equipo-a.component';
import { JugadorAComponent } from './administrador/jugador-a/jugador-a.component';
import { LoginAComponent } from './administrador/login-a/login-a.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { InicioUComponent } from './usuario/inicio-u/inicio-u.component';
import { EquipoUComponent } from './usuario/equipo-u/equipo-u.component';
import { JugadorUComponent } from './usuario/jugador-u/jugador-u.component';

const routes: Routes = [
  { path: '', redirectTo: 'aso-futbol/usuario/inicio', pathMatch: 'full' },
  { path: 'aso-futbol/login', component: LoginAComponent },

  {
    path: 'aso-futbol/administrador', component: AdministradorComponent, canActivate: [AuthGuard],
    children: [
      { path: 'equipo', component: EquipoAComponent, canActivate: [AuthGuard] },
      { path: 'equipo/:id', component: EquipoAComponent, canActivate: [AuthGuard] },
      { path: 'equipo/nuevo', component: EquipoAComponent, canActivate: [AuthGuard] },
      { path: 'jugador', component: JugadorAComponent, canActivate: [AuthGuard] },
      { path: 'jugador/:id', component: JugadorAComponent, canActivate: [AuthGuard] },
      { path: 'jugador/nuevo', component: JugadorAComponent, canActivate: [AuthGuard] },
    ]
  },

  {
    path: 'aso-futbol/usuario', component: UsuarioComponent,
    children: [
      { path: 'inicio', component: InicioUComponent },
      { path: 'equipo', component: EquipoUComponent },
      { path: 'equipo/:id', component: EquipoUComponent, canActivate: [AuthGuard] },
      { path: 'jugador', component: JugadorUComponent },
      { path: 'jugador/:id', component: JugadorUComponent, canActivate: [AuthGuard] },
    ]
  },

  // Otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }