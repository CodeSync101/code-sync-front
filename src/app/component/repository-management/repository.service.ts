import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GroupRepoDTO } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private apiUrl = 'http://localhost:8083/api/v1/group';

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<GroupRepoDTO[]> {
    console.log('Fetching groups from:', this.apiUrl);
    return this.http.get<GroupRepoDTO[]>(this.apiUrl).pipe(
      tap(response => console.log('Groups response:', response)),
      catchError(this.handleError)
    );
  }

  createGroup(groupData: any): Observable<GroupRepoDTO> {
    const requestData = {
      group_name: groupData.groupName.replace(/\s+/g, '-'),
      group_description: groupData.groupDescription,
      group_type: groupData.groupType,
      organizationId: groupData.organizationId
    };
    console.log('Creating group with data:', requestData);
    return this.http.post<GroupRepoDTO>(`${this.apiUrl}/create-group`, requestData).pipe(
      tap(response => console.log('Create response:', response)),
      catchError(this.handleError)
    );
  }

  updateGroup(id: number, groupData: any): Observable<GroupRepoDTO> {
    const requestData = {
      group_name: groupData.groupName,
      group_description: groupData.groupDescription,
      group_type: groupData.groupType,
      organizationId: groupData.organizationId
    };
    return this.http.put<GroupRepoDTO>(`${this.apiUrl}/${id}`, requestData).pipe(
      catchError(this.handleError)
    );
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Repository service error:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
} 