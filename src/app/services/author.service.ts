import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Author {
  id: number;
  name: string;
  email?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  //private apiUrl = 'http://localhost:8080/api/authors';
   private apiUrl = 'http://localhost:8082/task/api/api/authors';
  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }
}