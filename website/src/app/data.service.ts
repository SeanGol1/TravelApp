import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';
import { Country } from './models/country';
import { CountryDialogData } from './plan/add-country-dialog/add-country-dialog.component';
import { CityDialogData } from './country/add-city-dialog/add-city-dialog.component';
import { City } from './models/city';
import { TodoDialogData } from './city/add-todo-dialog/add-todo-dialog.component';
import { ToDo } from './models/todo';
import { UpdateCountryDialogData } from './country/country-info-dialog/country-info-dialog.component';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  baseUrl = "https://localhost:7219/api/";

  constructor(private http: HttpClient ) {    
  }

  headers = new HttpHeaders()
  .set('content-type', 'application/json');
  
  

  // APIKEY AMIldWC4IsUAz8zLDovkRNuZuq2pSPz9

  getPlanById(id:number){ 
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Plan>(this.baseUrl + 'plans/' + id,{'headers': this.headers});
  }

  createCountry(data:CountryDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Country>(this.baseUrl + 'countries/',data,{'headers': this.headers});
  }

  createCity(data:CityDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<City>(this.baseUrl + 'cities/',data,{'headers': this.headers});
  }
  createTodo(data:TodoDialogData){
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<ToDo>(this.baseUrl + 'todos/',data,{'headers': this.headers});
  }

  getCountry(name:string){
    return this.http.get('https://restcountries.com/v3.1/name/' + name + '?fullText=true')
  }

  updateCountry(data:UpdateCountryDialogData){
    return this.http.post<Country>(this.baseUrl + 'countries/update/',data,{'headers': this.headers});
  }
  deleteCountry(id:number){
    return this.http.delete(this.baseUrl + 'countries/' + id,{'headers': this.headers});
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
