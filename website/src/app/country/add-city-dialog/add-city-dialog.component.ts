import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})

export class AddCityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CityDialogData, 
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface CityDialogData {
  countryId: number;
  name: string;
}