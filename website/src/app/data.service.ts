import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "https://localhost:7219/api/";

  constructor(private http: HttpClient ) { }

  getPlanById(id:number){
    return this.http.get<Plan>(this.baseUrl + 'plans/' + id);
  }
}
