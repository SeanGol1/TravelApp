import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { City } from 'src/app/models/city';
import { Plan } from 'src/app/models/plan';
import { TravelType } from 'src/app/models/travel';

@Component({
  selector: 'app-add-travel-dialog',
  templateUrl: './add-travel-dialog.component.html',
  standalone: false,
  styleUrls: ['./add-travel-dialog.component.css']
})
export class AddTravelDialogComponent implements OnInit {
 travel:TravelDialogData = {fromCity:0,toCity:0,travelType:null};
 plan:Plan | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddTravelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {city:City},
    private dataservice:DataService
  ) { }

  ngOnInit(): void {
    this.dataservice.plan$.subscribe(p=>
      this.plan = p
    )
    this.travel.fromCity = this.data.city.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface TravelDialogData {
  fromCity: number;
  toCity:number;
  travelType:TravelType;

}
