import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
import { UpdateCityDialogData } from 'src/app/models/city';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-city-info-dialog',
  templateUrl: './city-info-dialog.component.html',
  styleUrl: './city-info-dialog.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class CityInfoDialogComponent implements OnInit {
  cityinfo: any | undefined;
  plan: Plan | undefined;
  poi: any | undefined;

  constructor(
    public dialogRef: MatDialogRef<CityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCityDialogData,
    private dataservice: DataService, private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {

    this.poi =  {
      "data": [
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "9CB40CB5D0",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/9CB40CB5D0",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.39165,
                  "longitude": 2.164772
              },
              "name": "Casa Batlló",
              "category": "SIGHTS",
              "rank": 5,
              "tags": [
                  "sightseeing",
                  "sights",
                  "museum",
                  "landmark",
                  "tourguide",
                  "restaurant",
                  "attraction",
                  "activities",
                  "commercialplace",
                  "shopping",
                  "souvenir"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "4690B83DCA",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/4690B83DCA",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.397987,
                  "longitude": 2.161159
              },
              "name": "La Pepita",
              "category": "RESTAURANT",
              "rank": 30,
              "tags": [
                  "restaurant",
                  "tapas",
                  "pub",
                  "bar",
                  "sightseeing",
                  "commercialplace"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "3EF139D861",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/3EF139D861",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.38827,
                  "longitude": 2.161604
              },
              "name": "Brunch & Cake",
              "category": "RESTAURANT",
              "rank": 30,
              "tags": [
                  "vegetarian",
                  "restaurant",
                  "breakfast",
                  "shopping",
                  "bakery",
                  "transport",
                  "patio",
                  "garden"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "AB3F122E3E",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AB3F122E3E",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.392376,
                  "longitude": 2.160919
              },
              "name": "Cervecería Catalana",
              "category": "RESTAURANT",
              "rank": 30,
              "tags": [
                  "restaurant",
                  "tapas",
                  "sightseeing",
                  "traditionalcuisine",
                  "bar",
                  "activities",
                  "commercialplace"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "752402FCA2",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/752402FCA2",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.40043,
                  "longitude": 2.15463
              },
              "name": "Botafumeiro",
              "category": "RESTAURANT",
              "rank": 30,
              "tags": [
                  "restaurant",
                  "seafood",
                  "sightseeing",
                  "professionalservices",
                  "transport",
                  "commercialplace"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "5F1CED3994",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/5F1CED3994",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.39148,
                  "longitude": 2.164981
              },
              "name": "Casa Amatller",
              "category": "SIGHTS",
              "rank": 100,
              "tags": [
                  "sightseeing",
                  "sights",
                  "museum",
                  "landmark",
                  "restaurant",
                  "tourguide",
                  "historicplace",
                  "historic",
                  "attraction",
                  "commercialplace",
                  "activities",
                  "shopping",
                  "events"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "30601A1A90",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/30601A1A90",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.390785,
                  "longitude": 2.167414
              },
              "name": "Tapas 24",
              "category": "RESTAURANT",
              "rank": 100,
              "tags": [
                  "restaurant",
                  "tapas",
                  "traditionalcuisine",
                  "sightseeing",
                  "commercialplace",
                  "transport",
                  "patio",
                  "garden",
                  "activities",
                  "bar"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "15C8B8148C",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/15C8B8148C",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.392677,
                  "longitude": 2.153942
              },
              "name": "Dry Martini",
              "category": "NIGHTLIFE",
              "rank": 100,
              "tags": [
                  "bar",
                  "restaurant",
                  "nightlife",
                  "club",
                  "sightseeing",
                  "attraction",
                  "activities"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "BD29CF2CCD",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/BD29CF2CCD",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.399193,
                  "longitude": 2.159853
              },
              "name": "Con Gracia",
              "category": "RESTAURANT",
              "rank": 100,
              "tags": [
                  "restaurant",
                  "sightseeing",
                  "commercialplace",
                  "professionalservices",
                  "activities"
              ]
          },
          {
              "type": "location",
              "subType": "POINT_OF_INTEREST",
              "id": "24DE6CE737",
              "self": {
                  "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/24DE6CE737",
                  "methods": [
                      "GET"
                  ]
              },
              "geoCode": {
                  "latitude": 41.390198,
                  "longitude": 2.156974
              },
              "name": "Osmosis",
              "category": "RESTAURANT",
              "rank": 100,
              "tags": [
                  "restaurant",
                  "shopping",
                  "transport",
                  "professionalservices"
              ]
          }
      ],
      "meta": {
          "count": 120,
          "links": {
              "self": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0",
              "next": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=10",
              "last": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=120",
              "first": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0",
              "up": "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page[limit]=10&page[offset]=0"
          }
      }
  
  
    }
    //KEEP THIS CODE !!!!!!!! DO NOT REMOVE !!!!!!!!!!

    // this.dataservice.getCity(this.data.name).subscribe({
    //   next: (cdata) => {
        // this.cityinfo = cdata['data'][0];
        // console.log('cdata: '+ cdata['data'][0])
        // console.log('city: '+ this.cityinfo)
        // var latlng: number[] = [this.cityinfo.geoCode.latitude, this.cityinfo.geoCode.longitude]
        // console.log(latlng);
        // var latlng = [41.397158,2.160873]  //test data until I buy Amadeus Api
        // this.dataservice.getPOI(latlng).subscribe({
        //   next: (poi) => {
        //     this.poi = poi;
        //   },
        //   error:(e)=>{
        //     console.log(e.message);
        //   }
          
        // });
      // },
      // error:(e)=>{
      //   console.log(e.message);
      // }
      
    // });

    this.dataservice.plan$.subscribe({
      next: plan => {
        this.plan = plan
      }
    })
  }

  deleteCity() {
    const i = this.data
    this.dataservice.deleteCity(i.id).subscribe({
      next: city => {
        this.toastr.success('City deleted');
        //remove from plan? 
        this.dialogRef.close();
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
