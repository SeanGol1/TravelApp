import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';
import { Country, UpdateCountryDialogData } from './models/country';
import { CountryDialogData } from './country/add-country-dialog/add-country-dialog.component';
import { City, CityDialogData, UpdateCityDialogData } from './models/city';
import { TodoDialogData } from './todo/add-todo-dialog/add-todo-dialog.component';
import { ToDo, ToDoUpdate } from './models/todo';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Travel } from './models/travel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private planSource = new BehaviorSubject<Plan | null>(null);
  plan$ = this.planSource.asObservable();

  //baseUrl = "https://localhost:7219/api/";
  baseUrl = "https://travelplannerappapi.azurewebsites.net/api/";
  headers = new HttpHeaders()
    .set('content-type', 'application/json');


  constructor(private http: HttpClient) {
  }

  // APIKEY AMIldWC4IsUAz8zLDovkRNuZuq2pSPz9



  getPlanById(id: number): Observable<Plan> {
    this.headers.set('Access-Control-Allow-Origin', '*');

    // return this.http.post<Plan>(this.baseUrl + 'plans/' + id, {'headers': this.headers}).pipe(
    //   map((response:Plan) => {
    //     const plan = response;
    //     if(plan){
    //       localStorage.setItem('plan',JSON.stringify(plan));
    //       this.planSource.next(plan);
    //     }
    //   })
    // )
    return this.http.get<Plan>(this.baseUrl + 'plans/' + id, { 'headers': this.headers });

  }

  updatePlan(data: Plan) {
    return this.http.post<Plan>(this.baseUrl + 'plan/update/', data, { 'headers': this.headers });
  }

  updateLocalPlan(plan: Plan) {
    localStorage.setItem('plan', JSON.stringify(plan));
    this.planSource.next(plan);
  }

  // Country
  createCountry(data: CountryDialogData) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Country>(this.baseUrl + 'countries/', data, { 'headers': this.headers });
  }

  updateCountry(data: UpdateCountryDialogData) {
    return this.http.post<Country>(this.baseUrl + 'countries/update/', data, { 'headers': this.headers });
  }

  deleteCountry(id: number) {
    return this.http.delete(this.baseUrl + 'countries/' + id, { 'headers': this.headers });
  }

  // City

  createCity(data: CityDialogData) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<City>(this.baseUrl + 'cities/', data, { 'headers': this.headers });
  }

  updateCity(data: UpdateCityDialogData) {
    return this.http.post<City>(this.baseUrl + 'cities/update/', data, { 'headers': this.headers });
  }

  deleteCity(id: number) {
    return this.http.delete(this.baseUrl + 'cities/' + id, { 'headers': this.headers });
  }

  //To Do
  createTodo(data: TodoDialogData) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<ToDo>(this.baseUrl + 'todos/', data, { 'headers': this.headers });
  }

  updateTodo(data: ToDoUpdate) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<ToDo>(this.baseUrl + 'todos/update/', data, { 'headers': this.headers });
  }

  // Travel

  createTravel(data: CityDialogData) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Travel>(this.baseUrl + 'travels/', data, { 'headers': this.headers });
  }

  getTravelByCityId(id: number) {
    this.headers.set('Access-Control-Allow-Origin', '*');

    return this.http.get<Travel>(this.baseUrl + 'travels/' + id, { 'headers': this.headers });

  }



  getCountry(name: string) {
    return this.http.get('https://restcountries.com/v3.1/name/' + name + '?fullText=true')
  }



  getAmadeusKey() {
    let xheaders = new HttpHeaders()
      .set('content-type', 'application/x-www-form-urlencoded');
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', 'AMIldWC4IsUAz8zLDovkRNuZuq2pSPz9');
    body.set('client_secret', 'GLysOz681Zm4QJfQ');
    return this.http.post('https://test.api.amadeus.com/v1/security/oauth2/token', body, { 'headers': xheaders });
  }

  getCity(name: string) {
    var accessToken
    try {
      this.getAmadeusKey().subscribe(access => {
        accessToken = access;
      });
      console.log(accessToken["access_token"])
      if (accessToken) {
        this.headers.set('Authorization', 'Bearer ' + accessToken["access_token"]);
        this.headers.set('content-type', 'application/vnd.amadeus+json');
        return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=' + name + '&max=1', { 'headers': this.headers })
      }
    }
    catch(e){
      console.log(e.message);
    }
    
    return null

  }


getPOI(latlng: number[]) {
  if (latlng) {
    var accessToken
    try {
      this.getAmadeusKey().subscribe(access => {
        accessToken = access;
      });
    }
    catch (e){
      console.log(e.message);
    }
    this.headers.set('Authorization', 'Bearer ' + accessToken["access_token"]);
    this.headers.set('content-type', 'application/vnd.amadeus+json');
    return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=' + latlng[0] + '&longitude=' + latlng[1] + '&radius=20&page%5Blimit%5D=10&page%5Boffset%5D=0', { 'headers': this.headers })
  }
  return null;
}



}
