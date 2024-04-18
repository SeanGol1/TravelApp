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
  providers:  [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class CityInfoDialogComponent implements OnInit{
  cityinfo: any | undefined;
  plan : Plan | undefined;
  poi : any | undefined;

  constructor(
    public dialogRef: MatDialogRef<CityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCityDialogData, 
    private dataservice: DataService
  ) {

  }

  ngOnInit(): void {
    this.dataservice.getCity(this.data.name).subscribe(cdata=>{
      this.cityinfo = cdata[0];      
      var latlng:number[] = [this.cityinfo.latitute, this.cityinfo.longitude]
      this.dataservice.getPOI(latlng).subscribe(p=>{
        this.poi = p;
      });
    });    

    this.dataservice.plan$.subscribe({
      next: plan=> {
        this.plan = plan              
      }
    })
  }

  deleteCountry(){
    this.dataservice.deleteCity(this.data.id).subscribe({
      next:city=>{
        //remove from plan? 
        this.dialogRef.close();
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
