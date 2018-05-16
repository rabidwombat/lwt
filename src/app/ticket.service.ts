import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Venue } from './dataTypes/venue';
import { Customer } from './dataTypes/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TicketService {

  private baseUrl = 'http://ec2-54-159-33-6.compute-1.amazonaws.com:8080/ticket-guru/v1/api';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getVenues (): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.baseUrl}/venues`)
      .pipe(
        tap(venues => this.log(`fetched venues`)),
        catchError(this.handleError('getVenues', []))
      );
  }

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`)
      .pipe(
        tap(venues => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getLevelAvailability(venueId:number, showId:number, performanceId:number, levels: any): Observable<any> {
    let httpRequests = [];
    levels.forEach(levelName => {
      httpRequests.push(this.http.get(`${this.baseUrl}/venues/${venueId}/shows/${showId}/performances/${performanceId}/availability?levelName=${levelName}`));
    });
    return forkJoin(httpRequests)
      .pipe(
        tap(options => this.log(`fetched levelOptions`)),
        catchError(this.handleError('getVenues', []))
      );
  }

  reserveSeats(venueId:number, showId:number, performanceId:number, orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/venues/${venueId}/shows/${showId}/performances/${performanceId}/reservations`, orderData)
      .pipe(
        tap(reserve => { this.log('reserving these seats:'); this.log(reserve); }),
        catchError(this.handleError('getVenues', []))
      );
  }

  confirmSeats(venueId:number, showId:number, performanceId:number, reservationId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/venues/${venueId}/shows/${showId}/performances/${performanceId}/reservations/${reservationId}/confirm`, {});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: any) {
    console.log('TicketService: ' + message);
  }
}
