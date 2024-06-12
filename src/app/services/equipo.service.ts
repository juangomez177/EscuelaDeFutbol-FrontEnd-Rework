/* 
 * Importaciones necesarias para aplicar el servicio.
 * Los servicios en angular se aplican a través de una solicitud HTTP
 * donde apis de tipo Rest son las que reciben el llamado mediante la misma url
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Equipo } from '../models/equipo';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class EquipoService {
  private equiposUrl = 'http://localhost:8080/app_web_futbol/equipo'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /** GET Equipos from the server */
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.equiposUrl).pipe(
      tap((_) => this.log('fetched Equipos')),
      catchError(this.handleError<Equipo[]>('getEquipos', []))
    );
  }

  /** GET Equipo by id. Return `undefined` when id not found */
  getEquipoNo404<Data>(id: number): Observable<Equipo> {
    const url = `${this.equiposUrl}/?id=${id}`;
    return this.http.get<Equipo[]>(url).pipe(
      map((Equipos) => Equipos[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} Equipo id=${id}`);
      }),
      catchError(this.handleError<Equipo>(`getEquipo id=${id}`))
    );
  }

  /** GET Equipo by id. Will 404 if id not found */
  getEquipo(id: number): Observable<Equipo> {
    const url = `${this.equiposUrl}/${id}`;
    return this.http.get<Equipo>(url).pipe(
      tap((_) => this.log(`fetched Equipo id=${id}`)),
      catchError(this.handleError<Equipo>(`getEquipo id=${id}`))
    );
  }

  /* GET Equipos whose name contains search term */
  searchEquipos(term: string): Observable<Equipo[]> {
    if (!term.trim()) {
      // if not search term, return empty Equipo array.
      return of([]);
    }
    return this.http.get<Equipo[]>(`${this.equiposUrl}/?term=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Equipos matching "${term}"`)
          : this.log(`no Equipos matching "${term}"`)
      ),
      catchError(this.handleError<Equipo[]>('searchEquipos', []))
    );
  }

  /* GET Equipos by name */
  searchEquipoByName(nombreEquipo: string): Observable<Equipo> {
    const url = `${this.equiposUrl}/buscar/${nombreEquipo}`;
    return this.http.get<Equipo>(url).pipe(
      tap(_ => this.log(`found Equipo with nombre ${nombreEquipo}`)),
      catchError(this.handleError<Equipo>(`searchEquipo nombre=${nombreEquipo}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Equipo to the server */
  addEquipo(Equipo: Equipo): Observable<Equipo> {
    return this.http
      .post<Equipo>(this.equiposUrl, Equipo, this.httpOptions)
      .pipe(
        tap((newEquipo: Equipo) =>
          this.log(`added Equipo w/ id=${newEquipo.id}`)
        ),
        catchError(this.handleError<Equipo>('addEquipo'))
      );
  }

  /** DELETE: delete the Equipo from the server */
  deleteEquipo(id: number): Observable<Equipo> {
    const url = `${this.equiposUrl}/${id}`;

    return this.http.delete<Equipo>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Equipo id=${id}`)),
      catchError(this.handleError<Equipo>('deleteEquipo'))
    );
  }

  /** PUT: update the Equipo on the server */
  updateEquipo(Equipo: Equipo): Observable<any> {
    return this.http.put(this.equiposUrl, Equipo, this.httpOptions).pipe(
      tap((_) => this.log(`updated Equipo id=${Equipo.id}`)),
      catchError(this.handleError<any>('updateEquipo'))
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

  /** Log a EquipoService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
