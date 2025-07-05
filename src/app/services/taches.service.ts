import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  private baseUrl = environment.apiUrl ;
  constructor(private http: HttpClient) { }

  getAllTaches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tache/getAll`);
  }

  createTache(tache: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tache/createTache`, tache);
  }


  updateTache(id: number, tache: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tache/update/${id}`, tache);
  }

  deleteTache(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tache/delete/${id}`);
  }

  getDataByMatiere(id : any): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/tache/getTacheByMatiere/${id}`);

  }



}