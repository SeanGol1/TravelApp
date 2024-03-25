import { Component, Inject } from '@angular/core';
import { Country } from 'src/app/models/country';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-country-dialog',
  templateUrl: './add-country-dialog.component.html',
  styleUrls: ['./add-country-dialog.component.css']
})
export class AddCountryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public country: Country,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
