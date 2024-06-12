import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';
import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jugador-u',
  templateUrl: './jugador-u.component.html',
  styleUrls: ['./jugador-u.component.css'],
})
export class JugadorUComponent implements OnInit {
  jugadoresFiltrados: Jugador[] = [];
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];

  jugadorSeleccionado: any = {};
  equipoSeleccionado: any = {};
  filtro: string = '';

  lista = true;
  form = false;
  editForm = false;

  constructor(
    private location: Location,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getJugadores();
    this.getEquipos();

    //Rutas para JUGADOR
    if (this.router.url.startsWith('/aso-futbol/usuario/jugador')) {
      const id = this.route.snapshot.paramMap.get('id');

      // Si el ID está vacío, navegar a la ruta principal
      if (!id) {
        this.router.navigate(['/aso-futbol/usuario/jugador']);
      }

      //Para verificar un jugador existente
      else {
        const id2 = parseInt(id);
        this.jugadorService.getJugador(id2).subscribe((jugador) => {
          // Si no hay un equipo correspondiente al ID, navegar a la ruta principal
          if (!jugador) {
            this.router.navigate(['/aso-futbol/usuario/jugador']);

            //Abra el formulario del jugador
          } else {
            this.visualizarJugador(jugador);

            this.editForm = true;
            this.lista = false;
          }
        });
      }
    }
  }

  //Métodos GET
  getJugadores(): void {
    this.jugadorService.getJugadores().subscribe((jugadores: Jugador[]) => {
      this.jugadores = jugadores;
      this.jugadoresFiltrados = jugadores; // Inicialmente, los jugadores filtrados serán los mismos que los jugadores totales
    });
  }

  getEquipos(): void {
    this.equipoService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  filtrarJugadores() {
    if (this.filtro) {
      this.jugadorService
        .getJugadoresFiltro(this.filtro)
        .subscribe((jugadores: Jugador[]) => {
          this.jugadores = jugadores;
          this.jugadoresFiltrados = jugadores; // Inicialmente, los jugadores filtrados serán los mismos que los jugadores totales
        });
    } else {
      this.getJugadores();
    }
  }

  visualizarJugador(jugador: Jugador): void {
    //Copia el jugador
    this.jugadorSeleccionado = Object.assign({}, jugador);

    //Actualizar url
    this.router.navigate(['/usuario/jugador', this.jugadorSeleccionado.id]);
  }

  volver() {
    this.location.back();
  }
}
