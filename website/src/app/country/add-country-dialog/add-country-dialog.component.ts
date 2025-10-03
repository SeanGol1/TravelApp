import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { CountryDialogData } from 'src/app/models/country';


@Component({
  selector: 'app-add-country-dialog',
  templateUrl: './add-country-dialog.component.html',
  styleUrls: ['./add-country-dialog.component.css']
})

export class AddCountryDialogComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  options: string[] = [];
  filteredOptions: string[];


  constructor(
    public dialogRef: MatDialogRef<AddCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryDialogData, private dataService: DataService
  ) {
    this.dataService.getRefCountryList().subscribe({
      next: countries => {
        this.options = countries.map(c => c.name);
        this.filteredOptions = this.options.slice();
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }
}




export { CountryDialogData };

