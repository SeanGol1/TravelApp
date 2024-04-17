import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';
import { Country, UpdateCountryDialogData } from './models/country';
import { CountryDialogData } from './plan/add-country-dialog/add-country-dialog.component';
import { City, CityDialogData } from './models/city';
import { TodoDialogData } from './city/add-todo-dialog/add-todo-dialog.component';
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

  baseUrl = "https://localhost:7219/api/";
  headers = new HttpHeaders()
  .set('content-type', 'application/json');
  

  constructor(private http: HttpClient ) {    
  }

  // APIKEY AMIldWC4IsUAz8zLDovkRNuZuq2pSPz9



  getPlanById(id:number):Observable<Plan>{ 
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
    return this.http.get<Plan>(this.baseUrl + 'plans/' + id,{'headers': this.headers});
    
  }

  updatePlan(data:Plan){
    return this.http.post<Plan>(this.baseUrl + 'plan/update/',data,{'headers': this.headers});
  }

  updateLocalPlan(plan:Plan){
    localStorage.setItem('plan',JSON.stringify(plan));
    this.planSource.next(plan);
  }

  createCountry(data:CountryDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Country>(this.baseUrl + 'countries/',data,{'headers': this.headers});
  }

  updateCountry(data:UpdateCountryDialogData){
    return this.http.post<Country>(this.baseUrl + 'countries/update/',data,{'headers': this.headers});
  }

  deleteCountry(id:number){
    return this.http.delete(this.baseUrl + 'countries/' + id,{'headers': this.headers});
  }

  createCity(data:CityDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<City>(this.baseUrl + 'cities/',data,{'headers': this.headers});
  }

  createTodo(data:TodoDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<ToDo>(this.baseUrl + 'todos/',data,{'headers': this.headers});
  }

  updateTodo(data:ToDoUpdate){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<ToDo>(this.baseUrl + 'todos/update/',data,{'headers': this.headers});
  }

// Travel

  createTravel(data:CityDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Travel>(this.baseUrl + 'travels/',data,{'headers': this.headers});
  }

  getTravelByCityId(id:number){ 
    this.headers.set('Access-Control-Allow-Origin', '*');

    return this.http.get<Travel>(this.baseUrl + 'travels/' + id,{'headers': this.headers});
    
  }



  getCountry(name:string){
    return this.http.get('https://restcountries.com/v3.1/name/' + name + '?fullText=true')
  }

  

  

  getPOI(latlng:number[]){
    var data = {'client_id':'AMIldWC4IsUAz8zLDovkRNuZuq2pSPz9', 'client_secret':'GLysOz681Zm4QJfQ', 'grant_type':'client_credentials'}
    var accessToken = this.http.post<any>('https://test.api.amadeus.com/v1/security/oauth2/token/', data );
    if(accessToken){
    this.headers.set('Authorization', 'Bearer '+ accessToken[5]);   
    this.headers.set('content-type','application/vnd.amadeus+json' ); 
    return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page%5Blimit%5D=10&page%5Boffset%5D=0',{'headers': this.headers})
  }
  else
  return "";
  }

  getAccessToken(){

  }

}
