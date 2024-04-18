import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dataservice: DataService
  ) {

  }

  ngOnInit(): void {

    //KEEP THIS CODE !!!!!!!! DO NOT REMOVE !!!!!!!!!!

    // this.dataservice.getCity(this.data.name).subscribe({
    //   next: (cdata) => {
        // this.cityinfo = cdata['data'][0];
        // console.log('cdata: '+ cdata['data'][0])
        // console.log('city: '+ this.cityinfo)
        // var latlng: number[] = [this.cityinfo.geoCode.latitude, this.cityinfo.geoCode.longitude]
        // console.log(latlng);
        var latlng = [41.397158,2.160873]  //test data until I buy Amadeus Api
        this.dataservice.getPOI(latlng).subscribe({
          next: (poi) => {
            this.poi = poi;
          },
          error:(e)=>{
            console.log(e.message);
          }
          
        });
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

  deleteCountry() {
    this.dataservice.deleteCity(this.data.id).subscribe({
      next: city => {
        //remove from plan? 
        this.dialogRef.close();
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
