import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './models/plan';
import { Country, UpdateCountryDialogData } from './models/country';
import { CountryDialogData } from './country/add-country-dialog/add-country-dialog.component';
import { City, CityDialogData, UpdateCityDialogData } from './models/city';
import { TodoDialogData } from './todo/add-todo-dialog/add-todo-dialog.component';
import { ToDo, ToDoUpdate } from './models/todo';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { Travel } from './models/travel';
import { TravelDialogData } from './travel/add-travel-dialog/add-travel-dialog.component';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import { ChecklistItem, ChecklistItemDialogData, UpdateChecklistItemDialogData } from './models/checklistitem';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private planSource = new BehaviorSubject<Plan | null>(null);
    plan$ = this.planSource.asObservable();

    private navSource = new BehaviorSubject<Boolean | false>(false);
    navIsOpen$ = this.navSource.asObservable();

    private isAdminSource = new BehaviorSubject<Boolean | false>(false);
    isAdmin$ = this.isAdminSource.asObservable();

    baseUrl = environment.apiUrl;
    headers = new HttpHeaders()
        .set('content-type', 'application/json');
    private attractionsCache = new Map<string, any>();


    constructor(private http: HttpClient) {
    }





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

    getPlanByUser(username: string) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        return this.http.get<Plan[]>(this.baseUrl + 'plans/userplanlist/' + username, { 'headers': this.headers });
    }

    addUserToPlan(data: any) {
        return this.http.post<Plan>(this.baseUrl + 'plans/adduser', data, { 'headers': this.headers });
    }

    getUserByPlanId(id: number) {
        return this.http.get<any[]>(this.baseUrl + 'plans/userlist/' + id, { 'headers': this.headers })
    }

    isAdminCheck(planid: number, username: string) {
        return this.http.post<boolean>(this.baseUrl + 'plans/isadmin', { planId: planid, username: username }, { 'headers': this.headers })
    }

    setLocalIsAdmin(isadmin: boolean) {
        this.isAdminSource.next(isadmin);
    }

    createPlan(data: any) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        const plan = this.http.post<Plan>(this.baseUrl + 'plans/', data, { 'headers': this.headers });
        return plan;
    }

    deletePlan(id: number) {
        const resp = this.http.delete<Plan>(this.baseUrl + 'plans/' + id, { 'headers': this.headers });
        return resp;
    }

    joinPlan(data: any) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        let plan = this.http.post<Plan>(this.baseUrl + 'plans/joinplan', data, { 'headers': this.headers });
        let p: Plan = undefined;
        plan.subscribe(plan => p = plan);
        //this.updateLocalPlan(p);
        return plan;
    }

    updatePlan(data: Plan) {
        return this.http.post<Plan>(this.baseUrl + 'plans/update/', data, { 'headers': this.headers });
    }

    updateLocalPlan(plan: Plan) {
        localStorage.setItem('plan', JSON.stringify(plan));
        this.planSource.next(plan);
    }

    updateNav() {
        this.navSource.next(!this.navSource.value);
    }

    // Country
    createCountry(data: CountryDialogData) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        data.name = data.name.trim();
        return this.http.post<Country>(this.baseUrl + 'countries/', data, { 'headers': this.headers });
    }

    updateCountry(data: UpdateCountryDialogData) {
        data.name = data.name.trim();
        return this.http.post<Country>(this.baseUrl + 'countries/update/', data, { 'headers': this.headers });
    }

    deleteCountry(id: number) {
        return this.http.delete(this.baseUrl + 'countries/' + id, { 'headers': this.headers });
    }

    // City

    createCity(data: CityDialogData) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        data.name = data.name.trim();
        return this.http.post<City>(this.baseUrl + 'cities/', data, { 'headers': this.headers });
        // if (city) {
        //     this.plan$.subscribe(plan => {
        //         plan.countries.forEach(c => {
        //             if(data.countryId == c.id){
        //                 city.pipe(city=>{
        //                     c.cities.push(city);
        //                     return city;
        //                 });                       
        //             }
        //         });
        //     });
        // }
        // return city;
    }

    getRefCityList(id: number) {
        return this.http.get<any[]>(this.baseUrl + 'cities/cityref/' + id, { 'headers': this.headers });
    }

    // getCityAttractions(name:string){
    //     return this.http.get<any[]>(this.baseUrl + 'cities/cityattractions/' + name,{ 'headers': this.headers });
    // }

    async getCityAttractions(cityName: string): Promise<any> {
        if (this.attractionsCache.has(cityName)) {
            return this.attractionsCache.get(cityName);
        }

        const atts = await firstValueFrom(
            this.http.get(`${this.baseUrl}cities/cityattractions/${cityName}`)
        );
        this.attractionsCache.set(cityName, atts);
        return atts;
    }

    updateCity(data: UpdateCityDialogData) {
        data.name = data.name.trim();
        return this.http.post<City>(this.baseUrl + 'cities/update/', data, { 'headers': this.headers });
    }

    updateCitySort(data: City[]) {
        return this.http.post<any>(this.baseUrl + 'cities/updatesort/', data, { 'headers': this.headers });
    }

    deleteCity(id: number) {
        const resp = this.http.delete<City>(this.baseUrl + 'cities/' + id, { 'headers': this.headers });
        if (resp) {
            this.plan$.subscribe(plan => {
                plan.countries.forEach(c => {
                    c.cities.forEach(ct => {
                        if (ct.id == id) {
                            c.cities.splice(c.cities.indexOf(ct), 1);
                        }
                    })
                })
            });
        }
        return resp;
    }

    //To Do
    createTodo(data: TodoDialogData) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        return this.http.post<ToDo>(this.baseUrl + 'todos/', data, { 'headers': this.headers });

        // return this.http.post<ToDo>(this.baseUrl + 'todos/', data, { 'headers': this.headers });
    }

    updateTodo(data: ToDoUpdate) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        return this.http.post<ToDo>(this.baseUrl + 'todos/update/', data, { 'headers': this.headers });
    }

    deleteToDo(id: number) {
        const resp = this.http.delete<ToDo>(this.baseUrl + 'todos/' + id, { 'headers': this.headers });
        if (resp) {
            this.plan$.subscribe(plan => {
                plan.countries.forEach(c => {
                    c.cities.forEach(ct => {
                        ct.toDos.forEach(todo => {
                            if (todo.id == id) {
                                ct.toDos.splice(ct.toDos.indexOf(todo), 1);
                            }
                        })
                    })
                })
            });
        }
        return resp;
    }

    // Travel

    createTravel(data: TravelDialogData) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        // const result = this.http.post<Travel>(this.baseUrl + 'travels/', data, { 'headers': this.headers });
        // if (result) {
        //     this.plan$.subscribe(plan => {
        //         plan.countries.forEach(c => {
        //             c.cities.forEach(ct => {
        //                 if(ct.id == data.fromCity){
        //                 result.subscribe(travel=>{
        //                     ct..push(todo);       
        //                 })
        //             }
        //             })
        //         })
        //     });
        // }

        return this.http.post<Travel>(this.baseUrl + 'travels/', data, { 'headers': this.headers });
    }

    getTravelByCityId(id: number) {
        this.headers.set('Access-Control-Allow-Origin', '*');

        return this.http.get<Travel>(this.baseUrl + 'travels/' + id, { 'headers': this.headers });

    }

    deleteTravel(id: number) {
        // const resp = this.http.delete<ToDo>(this.baseUrl + 'todos/' + id, { 'headers': this.headers });
        // if (resp) {
        //     this.plan$.subscribe(plan => {
        //         plan.countries.forEach(c => {
        //             c.cities.forEach(ct => {
        //                 if (ct.id == id) {
        //                     c.cities.splice(c.cities.indexOf(ct), 1);
        //                 }
        //             })
        //         })
        //     });
        // }
        return this.http.delete<Travel>(this.baseUrl + 'travels/' + id, { 'headers': this.headers });
    }



    //Checklist Item

    createChecklistItem(data: ChecklistItemDialogData) {
        this.headers.set('Access-Control-Allow-Origin', '*');
        return this.http.post<ChecklistItem>(this.baseUrl + 'checklistitems/', data, { 'headers': this.headers });
    }

    getChecklistItemByCountry(id: number) {
        return this.http.get<ChecklistItem[]>(this.baseUrl + 'checklistitems/list/' + id, { 'headers': this.headers });
    }

    updateChecklistItem(data: UpdateChecklistItemDialogData) {
        return this.http.post<ChecklistItem>(this.baseUrl + 'checklistitems/update', data, { 'headers': this.headers });
    }



    // External API


    getCountry(name: string) {
        return this.http.get('https://restcountries.com/v3.1/name/' + name + '?fullText=true')
    }

    getCountryByCityId(id: number) {
        let country: Country;
        this.planSource.value.countries.forEach(c => {
            c.cities.forEach(ct => {
                if (ct.id == id) {
                    country = c;
                }
            })
        })
        return country;
    }

    getAmadeusKey() {
        let xheaders = new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();
        body.set('grant_type', 'client_credentials');
        body.set('client_id', environment.amadeus_client_id);
        body.set('client_secret', environment.amadeus_client_secret);
        return this.http.post(environment.amadeus_url + 'security/oauth2/token', body, { 'headers': xheaders });
    }

    getCity(name: string): Observable<any> {
        // var accessToken
        // try {
        //   this.getAmadeusKey().subscribe({
        //     next: (access) => {
        //       accessToken = access;
        //       let xheaders = new HttpHeaders()
        //       xheaders.set('Authorization', 'Bearer ' + accessToken["access_token"]);
        //       xheaders.set('content-type', 'application/vnd.amadeus+json');
        //       return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=' + name + '&max=1', { 'headers': xheaders })
        //     },
        //     error: (e) => {
        //       console.log(e);
        //     }
        //   });
        // }
        // catch (e) {
        //   console.log(e.message);
        // }

        // return null

        // TODO: Change this to read LATLNG from RefCity Table
        return this.getAmadeusKey().pipe(
            switchMap((accessToken) => {
                const headers = new HttpHeaders()
                    .set('Authorization', 'Bearer ' + accessToken["access_token"])
                    .set('Content-Type', 'application/vnd.amadeus+json');

                return this.http.get(environment.amadeus_url + 'reference-data/locations/cities?keyword=' + name + '&max=1', { headers });
            })
        );

    }


    // getPOI(latlng: number[]) {//: Observable<any>
    //     // var accessToken
    //     //   this.getAmadeusKey().subscribe({        //     next: (access)=>{
    //     //      accessToken = access;
    //     //      let xheaders = new HttpHeaders()
    //     //      xheaders.set('Authorization', 'Bearer ' + accessToken["access_token"]);
    //     //       xheaders.set('content-type', 'application/vnd.amadeus+json');
    //     //       return this.http.get(environment.amadeus_url + 'reference-data/locations/pois?latitude=' + latlng[0] + '&longitude=' + latlng[1] + '&radius=20&page%5Blimit%5D=10&page%5Boffset%5D=0', { 'headers': xheaders })
    //     //     },
    //     //     error:(e)=>{
    //     //       console.log(e);            
    //     //     }
    //     //   });

    //     // return this.getAmadeusKey().pipe(
    //     //   switchMap((accessToken) => {
    //     //     const headers = new HttpHeaders()
    //     //       .set('Authorization', 'Bearer ' + accessToken["access_token"])
    //     //       .set('Content-Type', 'application/vnd.amadeus+json');
    //     //   // DO NOT DELETE
    //     //    // return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=' + latlng[0] + '&longitude=' + latlng[1] + '&radius=1&page%5Blimit%5D=10&page%5Boffset%5D=0', { headers });

    //     //   })
    //     // );
    //     var data = {
    //         "data": [
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "9CB40CB5D0",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/9CB40CB5D0",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.39165,
    //                     "longitude": 2.164772
    //                 },
    //                 "name": "Casa Batlló",
    //                 "category": "SIGHTS",
    //                 "rank": 5,
    //                 "tags": [
    //                     "sightseeing",
    //                     "sights",
    //                     "museum",
    //                     "landmark",
    //                     "tourguide",
    //                     "restaurant",
    //                     "attraction",
    //                     "activities",
    //                     "commercialplace",
    //                     "shopping",
    //                     "souvenir"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "4690B83DCA",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/4690B83DCA",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.397987,
    //                     "longitude": 2.161159
    //                 },
    //                 "name": "La Pepita",
    //                 "category": "RESTAURANT",
    //                 "rank": 30,
    //                 "tags": [
    //                     "restaurant",
    //                     "tapas",
    //                     "pub",
    //                     "bar",
    //                     "sightseeing",
    //                     "commercialplace"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "3EF139D861",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/3EF139D861",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.38827,
    //                     "longitude": 2.161604
    //                 },
    //                 "name": "Brunch & Cake",
    //                 "category": "RESTAURANT",
    //                 "rank": 30,
    //                 "tags": [
    //                     "vegetarian",
    //                     "restaurant",
    //                     "breakfast",
    //                     "shopping",
    //                     "bakery",
    //                     "transport",
    //                     "patio",
    //                     "garden"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "AB3F122E3E",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AB3F122E3E",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.392376,
    //                     "longitude": 2.160919
    //                 },
    //                 "name": "Cervecería Catalana",
    //                 "category": "RESTAURANT",
    //                 "rank": 30,
    //                 "tags": [
    //                     "restaurant",
    //                     "tapas",
    //                     "sightseeing",
    //                     "traditionalcuisine",
    //                     "bar",
    //                     "activities",
    //                     "commercialplace"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "752402FCA2",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/752402FCA2",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.40043,
    //                     "longitude": 2.15463
    //                 },
    //                 "name": "Botafumeiro",
    //                 "category": "RESTAURANT",
    //                 "rank": 30,
    //                 "tags": [
    //                     "restaurant",
    //                     "seafood",
    //                     "sightseeing",
    //                     "professionalservices",
    //                     "transport",
    //                     "commercialplace"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "5F1CED3994",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/5F1CED3994",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.39148,
    //                     "longitude": 2.164981
    //                 },
    //                 "name": "Casa Amatller",
    //                 "category": "SIGHTS",
    //                 "rank": 100,
    //                 "tags": [
    //                     "sightseeing",
    //                     "sights",
    //                     "museum",
    //                     "landmark",
    //                     "restaurant",
    //                     "tourguide",
    //                     "historicplace",
    //                     "historic",
    //                     "attraction",
    //                     "commercialplace",
    //                     "activities",
    //                     "shopping",
    //                     "events"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "30601A1A90",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/30601A1A90",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.390785,
    //                     "longitude": 2.167414
    //                 },
    //                 "name": "Tapas 24",
    //                 "category": "RESTAURANT",
    //                 "rank": 100,
    //                 "tags": [
    //                     "restaurant",
    //                     "tapas",
    //                     "traditionalcuisine",
    //                     "sightseeing",
    //                     "commercialplace",
    //                     "transport",
    //                     "patio",
    //                     "garden",
    //                     "activities",
    //                     "bar"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "15C8B8148C",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/15C8B8148C",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.392677,
    //                     "longitude": 2.153942
    //                 },
    //                 "name": "Dry Martini",
    //                 "category": "NIGHTLIFE",
    //                 "rank": 100,
    //                 "tags": [
    //                     "bar",
    //                     "restaurant",
    //                     "nightlife",
    //                     "club",
    //                     "sightseeing",
    //                     "attraction",
    //                     "activities"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "BD29CF2CCD",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/BD29CF2CCD",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.399193,
    //                     "longitude": 2.159853
    //                 },
    //                 "name": "Con Gracia",
    //                 "category": "RESTAURANT",
    //                 "rank": 100,
    //                 "tags": [
    //                     "restaurant",
    //                     "sightseeing",
    //                     "commercialplace",
    //                     "professionalservices",
    //                     "activities"
    //                 ]
    //             },
    //             {
    //                 "type": "location",
    //                 "subType": "POINT_OF_INTEREST",
    //                 "id": "24DE6CE737",
    //                 "self": {
    //                     "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/24DE6CE737",
    //                     "methods": [
    //                         "GET"
    //                     ]
    //                 },
    //                 "geoCode": {
    //                     "latitude": 41.390198,
    //                     "longitude": 2.156974
    //                 },
    //                 "name": "Osmosis",
    //                 "category": "RESTAURANT",
    //                 "rank": 100,
    //                 "tags": [
    //                     "restaurant",
    //                     "shopping",
    //                     "transport",
    //                     "professionalservices"
    //                 ]
    //             }
    //         ],
    //         "meta": {
    //             "count": 120,
    //             "links": {
    //                 "self": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0",
    //                 "next": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=10",
    //                 "last": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=120",
    //                 "first": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0",
    //                 "up": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0"
    //             }
    //         }


    //     }
    //     return data

    // }



}
