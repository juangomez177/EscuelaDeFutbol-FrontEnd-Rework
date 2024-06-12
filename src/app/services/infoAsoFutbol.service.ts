/*
 * Importaciones necesarias para aplicar el servicio.
 * Los servicios en angular se aplican a través de una solicitud HTTP
 * donde apis de tipo Rest son las que reciben el llamado mediante la misma url
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { InfoAsoFutbol } from '../models/infoAsoFutbol';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class InfoAsoFutbolService {
  private infoAsoFutbolUrl = 'http://localhost:8080/app_web_futbol/asofutbol'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /**  GET InfoAsoFutbol by id */
  getInfoAsoFutbolo(id: number): Observable<InfoAsoFutbol> {
    const url = `${this.infoAsoFutbolUrl}/${id}`;
    return this.http.get<InfoAsoFutbol>(url).pipe(
      tap((_) => this.log(`fetched InfoAsoFutbol id=${id}`)),
      catchError(this.handleError<InfoAsoFutbol>(`getInfoAsoFutbol id=${id}`))
    );
  }

  /** POST: add a new InfoAsoFutbol to the server */
  addInfoAsoFutbol(InfoAsoFutbol: InfoAsoFutbol): Observable<InfoAsoFutbol> {
    return this.http
      .post<InfoAsoFutbol>(this.infoAsoFutbolUrl, InfoAsoFutbol, this.httpOptions)
      .pipe(
        tap((newInfoAsoFutbol: InfoAsoFutbol) =>
          this.log(`added InfoAsoFutbol w/ id=${newInfoAsoFutbol.id}`)
        ),
        catchError(this.handleError<InfoAsoFutbol>('addInfoAsoFutbol'))
      );
  }

  /** PUT: update the InfoAsoFutbol on the server */
  updateInfoAsoFutbol(InfoAsoFutbol: InfoAsoFutbol): Observable<any> {
    return this.http.put(this.infoAsoFutbolUrl, InfoAsoFutbol, this.httpOptions).pipe(
      tap((_) => this.log(`updated InfoAsoFutbol id=${InfoAsoFutbol.id}`)),
      catchError(this.handleError<any>('updateInfoAsoFutbol'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a InfoAsoFutbolService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}