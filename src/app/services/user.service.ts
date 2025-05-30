import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserRequest, UserUpdateRequest, GroupRepoDTO } from '../models/user';

export interface Group {
  id: number;
  group_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8083/api/v1/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(user: UserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addUserToGroup(userId: number, groupId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/groups/${groupId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  removeUserFromGroup(userId: number, groupName: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}/groups/${groupName}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`http://localhost:8083/api/v1/group`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}