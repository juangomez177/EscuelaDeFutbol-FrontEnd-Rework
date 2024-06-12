import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo.service';
import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AwsService } from '../../services/aws.service';

@Component({
  selector: 'app-jugador-a',
  templateUrl: './jugador-a.component.html',
  styleUrls: ['./jugador-a.component.css'],
})
export class JugadorAComponent implements OnInit {
  jugadoresFiltrados: Jugador[] = [];
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];

  jugadorSeleccionado: any = {};
  equipoSeleccionado: any = {};
  filtro: string = '';

  lista = true;
  form = false;
  editForm = false;

  selectedFile: File | null = null;

  constructor(
    private location: Location,
    private AwsService: AwsService,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getJugadores();
    this.getEquipos();

    //Rutas para JUGADOR
    if (this.router.url.startsWith('/aso-futbol/administrador/jugador')) {
      const id = this.route.snapshot.paramMap.get('id');

      // Si el ID está vacío, navegar a la ruta principal
      if (!id) {
        this.router.navigate(['/administrador/jugador']);
      }

      // Para crear un nuevo jugador
      else if (this.router.url.startsWith('/aso-futbol/administrador/jugador/nuevo')) {
        this.lista = false;
        this.form = true;
      }

      //Para verificar un jugador existente
      else {
        const id2 = parseInt(id);
        this.jugadorService.getJugador(id2).subscribe((jugador) => {
          // Si no hay un equipo correspondiente al ID, navegar a la ruta principal
          if (!jugador) {
            this.router.navigate(['/aso-futbol/administrador/jugador']);

            //Abra el formulario del jugador
          } else {
            this.editarJugador(jugador);

            this.editForm = true;
            this.lista = false;
          }
        });
      }
    }
  }

  //Sweet alerts
  mostrarSweetAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Exito en la transacción!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlert2(): void {
    Swal.fire({
      icon: 'success',
      title: 'EXITO',
      text: '¡Datos Limpiados!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlertError(): void {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: '¡Campos obligatorios!',
      confirmButtonText: 'Aceptar',
    });
  }

  mostrarSweetAlertConfirm(): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: 'No podrá revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        resolve(result);
      });
    });
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

  //Métodos EDIT
  editarJugador(jugador: Jugador): void {
    //Copia el jugador
    this.jugadorSeleccionado = Object.assign({}, jugador);

    //Actualizar url
    this.router.navigate([
      '/administrador/jugador',
      this.jugadorSeleccionado.id,
    ]);
  }

  //Operaciones básicas para jugador
  add(
    id_equipo: number,
    nombre: string,
    edad: string,
    categoria: string,
    nombre_equipo: string,
    posicion: string,
    n_camiseta: string,
    telefono: string,
    correo: string
  ): void {
    if (
      !id_equipo ||
      !nombre ||
      !edad ||
      !categoria ||
      !nombre_equipo ||
      !posicion ||
      !n_camiseta ||
      !telefono ||
      !correo
    ) {
      this.mostrarSweetAlertError();
      this.getJugadores();

      return;
    }
    this.jugadorService
      .addJugador({
        id_equipo,
        nombre,
        edad,
        categoria,
        nombre_equipo,
        posicion,
        n_camiseta,
        telefono,
        correo,
        foto: this.jugadorSeleccionado.foto

      } as unknown as Jugador)
      .subscribe((jugador) => {
        this.jugadores.push(jugador);
      });

    this.mostrarSweetAlert();
    this.getJugadores();

    this.lista = true;
    this.form = false

    //Actualizar url
    this.volver();
  }

  edit(jugador: Jugador): void {
    // Obtienen el id y la categoria de equipo del Equipo seleccionado, para asignarlo al jugador que se va a editar, 
    // Todo para asegurarse de que el jugador es editado correctamente.
    this.equipoService.searchEquipoByName(jugador.nombre_equipo).subscribe(equipo => {
      jugador.id_equipo = equipo.id; // Asignar el ID del equipo al jugador
      jugador.categoria = equipo.categoria;
      this.jugadorService.updateJugador(jugador).subscribe(() => {
        this.mostrarSweetAlert();
        window.location.reload();
        this.volver();
      }, error => {

        console.error('Error al actualizar jugador:', error);
      });
    }, error => {
      console.error('Error al buscar equipo:', error);
    });
  }

  delete(jugador: Jugador): void {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        this.jugadores = this.jugadores.filter((h) => h !== jugador);
        this.jugadorService.deleteJugador(jugador.id).subscribe();
        this.mostrarSweetAlert();

      }
    });
  }

  //Gestión de archivos
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.AwsService.uploadFileToS3(formData).subscribe(
        (response: any) => {
          if (response && response.value) {

            // Asignar el nombre de la imagen devuelto por el servicio al campo foto del jugador
            this.jugadorSeleccionado.foto = response.value;


          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  volver() {
    this.location.back();
  }
}
