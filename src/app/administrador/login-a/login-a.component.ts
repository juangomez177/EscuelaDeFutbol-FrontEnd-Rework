import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { ChangePasswordRequest } from 'src/app/models/changePasswordRequest';

@Component({
  selector: 'app-login-a',
  templateUrl: './login-a.component.html',
  styleUrls: ['./login-a.component.css'],
})
export class LoginAComponent {
  email: string = '';
  password: string = '';
  newPassword: string = '';
  jsonResponse: String = '';
  form: boolean = true;
  form2: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  //Proceso del login
  onSubmit() {
    //Inicialización de un login
    const loginData: Login = {
      id: 0,
      nombre: '',
      correo: this.email,
      contraseña: this.password,
    };
    this.loginService.login(loginData).subscribe(
      (response: any) => {
        this.jsonResponse = response.error.text;
      },

      // Como el Api-rest retorna un ResponseEntity<String>, obtendremos un JSON que siempre redireccionará en el error, pero el campo del resultado está en el JSON.error.text;
      (error: any) => {
        this.jsonResponse = error.error.text;

        //Credenciales correctas
        if (this.jsonResponse === 'Inicio de sesión exitoso') {

          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'Inicio de sesión exitoso',
            confirmButtonText: 'Aceptar',
          });

          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/aso-futbol/administrador/equipo']);
          this.clear();

          //Credenciales incorrectas
        } else {

          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Credenciales inválidas',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    );
  }

  //Proceso de cambiar contraseña
  onChange() {
    this.mostrarSweetAlertConfirm().then((result) => {
      if (result.isConfirmed) {
        const changePasswordData: ChangePasswordRequest = {
          correo: this.email,
          oldPassword: this.password,
          newPassword: this.newPassword,
        };

        this.loginService.changePassword(changePasswordData).subscribe(
          (response: any) => {
            this.jsonResponse = response.error.text;
          },

          // Como el Api-rest retorna un ResponseEntity<String>, obtendremos un JSON que siempre redireccionará en el error, pero el campo del resultado está en el JSON.error.text;
          (error: any) => {
            this.jsonResponse = error.error.text;

            //Credenciales correctas, se puede cambiar contraseña
            if (this.jsonResponse === 'Contraseña cambiada exitosamente') {

              Swal.fire({
                icon: 'success',
                title: 'EXITO',
                text: 'Contraseña cambiada exitosamente',
                confirmButtonText: 'Aceptar',
              });

              this.form = true;
              this.form2 = false;
              this.clear();

              //Credenciales incorrectas o error del sistema
            } else {

              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Error al cambiar contraseña, Datos No coinciden',
                confirmButtonText: 'Aceptar',
              });
            }
          }
        );
      }
    });
  }

  clear() {
    this.email = '';
    this.password = '';
    this.newPassword = '';
  }

  mostrarSweetAlertConfirm(): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        title: '¿Está seguro que desea cambiar contraseña?',
        text: 'No podrá revertir esta acción',
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
}
