import { Component, ElementRef, Inject, Input, OnInit, ViewChild, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { DataService } from 'src/app/data.service';
import { Country, UpdateCountryDialogData } from 'src/app/models/country';
import { LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-country-info-dialog',
  templateUrl: './country-info-dialog.component.html',
  styleUrls: ['./country-info-dialog.component.css'],
  providers:  [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
]
})
export class CountryInfoDialogComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  countryinfo: any | undefined;
  options: string[] = [];
  filteredOptions: string[];

  constructor(
    public dialogRef: MatDialogRef<CountryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCountryDialogData, private dataservice: DataService
  ) {
      this.dataservice.getRefCountryList().subscribe({
      next: countries => {
        this.options = countries.map(c => c.name);
        this.filteredOptions = this.options.slice();
      }
    });
  }

  ngOnInit(): void {
    this.dataservice.getCountry(this.data.name).subscribe(cdata=>{
      this.countryinfo = cdata[0];      
      // this.dataservice.getPOI(this.countryinfo.latlng).subscribe(c=>{

      // });
    });    
  }

  deleteCountry(){
    this.dataservice.deleteCountry(this.data.id).subscribe({
      next:country=>{
        //remove from plan? 
        this.dialogRef.close();
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


