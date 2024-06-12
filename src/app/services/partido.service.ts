/*
 * Importaciones necesarias para aplicar el servicio.
 * Los servicios en angular se aplican a través de una solicitud HTTP
 * donde apis de tipo Rest son las que reciben el llamado mediante la misma url
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Partido } from '../models/partido';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class PartidoService {
  private partidosUrl = 'http://localhost:8080/app_web_futbol/partido'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET Partidos from the server */
  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.partidosUrl).pipe(
      tap((_) => this.log('fetched Partidos')),
      catchError(this.handleError<Partido[]>('getPartidos', []))
    );
  }

  /** Get Partidos by id_equipo */
  getPartidosEquipo(id_equipo: number): Observable<Partido[]> {
    const url = `${this.partidosUrl}/equipo/${id_equipo}`;
    return this.http.get<Partido[]>(url);
  }

  /** GET Partido by id. Return `undefined` when id not found */
  getPartidoNo404<Data>(id: number): Observable<Partido> {
    const url = `${this.partidosUrl}/?id=${id}`;
    return this.http.get<Partido[]>(url).pipe(
      map((Partidos) => Partidos[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} Partido id=${id}`);
      }),
      catchError(this.handleError<Partido>(`getPartido id=${id}`))
    );
  }

  /** GET Partido by id. Will 404 if id not found */
  getPartido(id: number): Observable<Partido> {
    const url = `${this.partidosUrl}/${id}`;
    return this.http.get<Partido>(url).pipe(
      tap((_) => this.log(`fetched Partido id=${id}`)),
      catchError(this.handleError<Partido>(`getPartido id=${id}`))
    );
  }

  /* GET Partidos whose name contains search term */
  searchPartidos(term: string): Observable<Partido[]> {
    if (!term.trim()) {
      // if not search term, return empty Partido array.
      return of([]);
    }
    return this.http.get<Partido[]>(`${this.partidosUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Partidos matching "${term}"`)
          : this.log(`no Partidos matching "${term}"`)
      ),
      catchError(this.handleError<Partido[]>('searchPartidos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Partido to the server */
  addPartido(Partido: Partido): Observable<Partido> {
    return this.http
      .post<Partido>(this.partidosUrl, Partido, this.httpOptions)
      .pipe(
        tap((newPartido: Partido) =>
          this.log(`added Partido w/ id=${newPartido.id}`)
        ),
        catchError(this.handleError<Partido>('addPartido'))
      );
  }

  /** DELETE: delete the Partido from the server */
  deletePartido(id: number): Observable<Partido> {
    const url = `${this.partidosUrl}/${id}`;

    return this.http.delete<Partido>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Partido id=${id}`)),
      catchError(this.handleError<Partido>('deletePartido'))
    );
  }

  /** PUT: update the Partido on the server */
  updatePartido(Partido: Partido): Observable<any> {
    return this.http.put(this.partidosUrl, Partido, this.httpOptions).pipe(
      tap((_) => this.log(`updated Partido id=${Partido.id}`)),
      catchError(this.handleError<any>('updatePartido'))
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

  /** Log a Partidoservice message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
