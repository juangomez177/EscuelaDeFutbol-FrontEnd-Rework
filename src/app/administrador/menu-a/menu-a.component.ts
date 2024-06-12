import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.css'],
})
export class MenuAComponent {
  constructor(private router: Router) { }

  ngOnInit() { }

  mostrarSweetAlertConfirm(): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        title: '¿Está seguro que desea salir?',
        text: 'Tendrá que ingresar de nuevo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        resolve(result);
      });
    });
  }

  logout() {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn'); // Eliminar la bandera de inicio de sesión del almacenamiento local
        this.router.navigate(['/aso-futbol/login']);
      }
    });
  }
}
