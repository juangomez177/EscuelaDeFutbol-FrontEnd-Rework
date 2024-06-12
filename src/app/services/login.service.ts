/*
 * Importaciones necesarias para aplicar el servicio.
 * Los servicios en angular se aplican a través de una solicitud HTTP
 * donde apis de tipo Rest son las que reciben el llamado mediante la misma url
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { ChangePasswordRequest } from '../models/changePasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /* GET login from the server */
  private apiUrl = 'http://localhost:8080/app_web_futbol/login';// URL de tu API REST de inicio de sesión
  login(loginData: Login): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<String>(this.apiUrl, loginData, httpOptions);
  }

  /* PUT change password to the server */
  private apiUrl2 = 'http://localhost:8080/app_web_futbol/change_password';
  changePassword(changePasswordData: ChangePasswordRequest): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<String>(this.apiUrl2, changePasswordData, httpOptions);
  }

}
