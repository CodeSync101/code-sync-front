import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TachesService {


  private apiUrl = 'http://localhost:8084/projetMission/tache';

  constructor(private http: HttpClient) { }

  getAllTaches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  createTache(tache: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createTache`, tache);
  }


  updateTache(id: number, tache: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, tache);
  }

  deleteTache(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  getDataByMatiere(id : any): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/getTacheByMatiere/${id}`);

  }



}
