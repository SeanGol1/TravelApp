import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from 'src/app/models/plan';
import { TravelType } from 'src/app/models/travel';

@Component({
  selector: 'app-add-travel-dialog',
  templateUrl: './add-travel-dialog.component.html',
  styleUrls: ['./add-travel-dialog.component.css']
})
export class AddTravelDialogComponent {
 travel:TravelDialogData = {fromCity:0,toCity:0,travelType:null};

  constructor(
    public dialogRef: MatDialogRef<AddTravelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {plan:Plan},
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface TravelDialogData {
  fromCity: number;
  toCity:number;
  travelType:TravelType;

}
