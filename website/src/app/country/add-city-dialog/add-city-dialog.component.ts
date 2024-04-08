import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Plan } from 'src/app/models/plan';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})

export class AddCityDialogComponent implements OnInit{
  // myControl = new FormControl<string | Country>('');
  // filteredOptions: Observable<Country[]>;
  city: CityDialogData = {countryId: 0, name: ''};

  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {plan:Plan}, 
  ) {      
    
   }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     const name = typeof value === 'string' ? value : value?.name;
    //     return name ? this._filter(name as string) : this.data[0].countries.slice();
    //   }),
    // );
  }

  // displayFn(country: Country): string {
  //   return country && country.name ? country.name : '';
  // }

  // private _filter(name: string): Country[] {
  //   const filterValue = name.toLowerCase();

  //   return this.data.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

export interface CityDialogData {
  countryId: number;
  name: string;
}