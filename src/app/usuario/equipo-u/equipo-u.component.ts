import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';
import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';
import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partido.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipo-u',
  templateUrl: './equipo-u.component.html',
  styleUrls: ['./equipo-u.component.css'],
})
export class EquipoUComponent implements OnInit {
  equipos: Equipo[] = [];
  jugadores: Jugador[] = [];
  partidos: Partido[] = [];

  equipoSeleccionado: any = {};
  equipo: any = {};
  partidoSeleccionado: any = {};
  partido: any = {};

  lista = true;
  form = false;
  editForm = false;
  formP = false;
  editFormP = false;

  constructor(
    private equipoService: EquipoService,
    private jugadorService: JugadorService,
    private partidoService: PartidoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEquipos();

    //Rutas para EQUIPO
    if (this.router.url.startsWith('/aso-futbol/usuario/equipo')) {
      const id = this.route.snapshot.paramMap.get('id');

      // Si el ID está vacío, navegar a la ruta principal
      if (!id) {
        this.router.navigate(['/aso-futbol/usuario/equipo']);
      }

      //Para verificar un equipo existente
      else {
        const id2 = parseInt(id);
        this.equipoService.getEquipo(id2).subscribe((equipo) => {
          // Si no hay un equipo correspondiente al ID, navegar a la ruta principal
          if (!equipo) {
            this.router.navigate(['/aso-futbol/usuario/equipo']);

            //Abra el formulario de visualización de equipo
          } else {
            this.detallesEquipo(equipo);

            this.lista = false;
            this.editForm = true;
          }
        });
      }
    }

    /*
    Ruta partidos (No es necesario)
    */
  }

  //Métodos GET
  getEquipos(): void {
    this.equipoService
      .getEquipos()
      .subscribe((equipos) => (this.equipos = equipos));
  }

  getPartidos(): void {
    this.partidoService
      .getPartidos()
      .subscribe((partidos) => (this.partidos = partidos));
  }

  getJugadoresEquipo(idEquipo: number): void {
    this.jugadorService
      .getJugadoresEquipo(idEquipo)
      .subscribe((jugadores) => (this.jugadores = jugadores));
  }

  getpartidosEquipo(idEquipo: number): void {
    this.partidoService
      .getPartidosEquipo(idEquipo)
      .subscribe((partidos) => (this.partidos = partidos));
  }

  detallesEquipo(equipo: Equipo): void {
    //Copia el equipo
    this.equipoSeleccionado = Object.assign({}, equipo);

    //Busca a los jugadores con equipo
    this.getJugadoresEquipo(this.equipoSeleccionado.id);

    //Busca a los partidos con equipo
    this.getpartidosEquipo(this.equipoSeleccionado.id);

    //Actualizar url
    this.router.navigate(['/aso-futbol/usuario/equipo', this.equipoSeleccionado.id]);
  }

  detallesPartido(partido: Partido): void {
    //Copia el partido
    this.partidoSeleccionado = Object.assign({}, partido);

    //Busca a los partidos con equipo
    this.getpartidosEquipo(this.partidoSeleccionado.id);
  }

  volver() {
    this.location.back();
  }
}
