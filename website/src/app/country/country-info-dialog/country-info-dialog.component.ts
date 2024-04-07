import { Component, Inject, Input, OnInit, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { DataService } from 'src/app/data.service';
import { Country } from 'src/app/models/country';
import { LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-country-info-dialog',
  templateUrl: './country-info-dialog.component.html',
  styleUrls: ['./country-info-dialog.component.css'],
  providers:  [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
]
})
export class CountryInfoDialogComponent implements OnInit {
  countryinfo: any | undefined;

  constructor(
    public dialogRef: MatDialogRef<CountryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCountryDialogData, private dataservice: DataService
  ) {

  }

  ngOnInit(): void {
    this.dataservice.getCountry(this.data.name).subscribe(cdata=>{
      this.countryinfo = cdata[0];      
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface UpdateCountryDialogData {
  countryId: number;
  name: string;
  startDate: Date;
  endDate: Date;
}
