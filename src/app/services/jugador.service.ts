/*
 * Importaciones necesarias para aplicar el servicio.
 * Los servicios en angular se aplican a través de una solicitud HTTP
 * donde apis de tipo Rest son las que reciben el llamado mediante la misma url
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jugador } from '../models/jugador';
//import { MessageService } from './message.service';

//Métodos para interactuar con el servicio, como conexión al servidor, consulta, eliminación, etc
@Injectable({ providedIn: 'root' })
export class JugadorService {
  private jugadoresUrl = 'http://localhost:8080/app_web_futbol/jugador'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /** GET Jugadores from the server */
  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.jugadoresUrl).pipe(
      tap((_) => this.log('fetched Jugadores')),
      catchError(this.handleError<Jugador[]>('getJugadores', []))
    );
  }

  /**  GET Jugadores by id_equipo */
  getJugadoresEquipo(id_equipo: number): Observable<Jugador[]> {
    const url = `${this.jugadoresUrl}/equipo/${id_equipo}`;
    return this.http.get<Jugador[]>(url);
  }

  /**  GET Jugadores by a filter */
  getJugadoresFiltro(filtro: String): Observable<Jugador[]> {
    const url = `${this.jugadoresUrl}/filtro/${filtro}`;
    return this.http.get<Jugador[]>(url);
  }

  /** GET Jugador by id. Return `undefined` when id not found */
  getJugadorNo404<Data>(id: number): Observable<Jugador> {
    const url = `${this.jugadoresUrl}/?id=${id}`;
    return this.http.get<Jugador[]>(url).pipe(
      map((Jugadores) => Jugadores[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} Jugador id=${id}`);
      }),
      catchError(this.handleError<Jugador>(`getJugador id=${id}`))
    );
  }

  /** GET Jugador by id. Will 404 if id not found */
  getJugador(id: number): Observable<Jugador> {
    const url = `${this.jugadoresUrl}/${id}`;
    return this.http.get<Jugador>(url).pipe(
      tap((_) => this.log(`fetched Jugador id=${id}`)),
      catchError(this.handleError<Jugador>(`getJugador id=${id}`))
    );
  }

  /* GET Jugadores whose name contains search term */
  searchJugadores(term: string): Observable<Jugador[]> {
    if (!term.trim()) {
      // if not search term, return empty Jugador array.
      return of([]);
    }
    return this.http.get<Jugador[]>(`${this.jugadoresUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found Jugadores matching "${term}"`)
          : this.log(`no Jugadores matching "${term}"`)
      ),
      catchError(this.handleError<Jugador[]>('searchJugadores', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Jugador to the server */
  addJugador(Jugador: Jugador): Observable<Jugador> {
    return this.http
      .post<Jugador>(this.jugadoresUrl, Jugador, this.httpOptions)
      .pipe(
        tap((newJugador: Jugador) =>
          this.log(`added Jugador w/ id=${newJugador.id}`)
        ),
        catchError(this.handleError<Jugador>('addJugador'))
      );
  }

  /** DELETE: delete the Jugador from the server */
  deleteJugador(id: number): Observable<Jugador> {
    const url = `${this.jugadoresUrl}/${id}`;

    return this.http.delete<Jugador>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Jugador id=${id}`)),
      catchError(this.handleError<Jugador>('deleteJugador'))
    );
  }

  /** PUT: update the Jugador on the server */
  updateJugador(Jugador: Jugador): Observable<any> {
    return this.http.put(this.jugadoresUrl, Jugador, this.httpOptions).pipe(
      tap((_) => this.log(`updated Jugador id=${Jugador.id}`)),
      catchError(this.handleError<any>('updateJugador'))
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

  /** Log a Jugadoreservice message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
