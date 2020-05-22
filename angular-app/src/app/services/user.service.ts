import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: any) {
    return throwError(error.error);
  }

  createUser(user: User): Observable<any> {
    return this.httpClient
      .post<User[]>(this.API_URL + `/api/user`, user)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.httpClient
      .get<User[]>(this.API_URL + `/api/user`)
      .pipe(catchError(this.handleError));
  }

  getUserById(_id: string): Observable<any> {
    return this.httpClient
      .get<User[]>(this.API_URL + `/api/user/${_id}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(_id: string, user: User): Observable<any> {
    return this.httpClient
      .put<User[]>(this.API_URL + `/api/user/${_id}`, user)
      .pipe(catchError(this.handleError));
  }

  deleteUser(_id: string): Observable<any> {
    return this.httpClient
      .delete<User[]>(this.API_URL + `/api/user/${_id}`)
      .pipe(catchError(this.handleError));
  }
}
