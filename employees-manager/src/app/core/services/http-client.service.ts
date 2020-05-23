import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from './../../../environments/environment';

/**
 * Global Http service
 */
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  // GET
  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${url}`)
      .pipe(catchError(this.handleError));
  }

  // POST
  post<T>(url: string, data): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${url}`, data)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
}
