import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryDialogData } from 'src/app/models/country';


@Component({
  selector: 'app-add-country-dialog',
  templateUrl: './add-country-dialog.component.html',
  styleUrls: ['./add-country-dialog.component.css']
})

export class AddCountryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryDialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}




export { CountryDialogData };

