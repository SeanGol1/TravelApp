import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';
import { Country } from './models/country';
import { CountryDialogData } from './plan/add-country-dialog/add-country-dialog.component';
import { CityDialogData } from './country/add-city-dialog/add-city-dialog.component';
import { City } from './models/city';
import { TodoDialogData } from './city/add-todo-dialog/add-todo-dialog.component';
import { ToDo } from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "https://localhost:7219/api/";

  constructor(private http: HttpClient ) { }

  getPlanById(id:number){
    return this.http.get<Plan>(this.baseUrl + 'plans/' + id);
  }

  createCountry(data:CountryDialogData){
    return this.http.post<Country>(this.baseUrl + 'countries/',data);
  }

  createCity(data:CityDialogData){
    return this.http.post<City>(this.baseUrl + 'cities/',data);
  }
  createTodo(data:TodoDialogData){
    return this.http.post<ToDo>(this.baseUrl + 'todos/',data);
  }
}
