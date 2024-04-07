import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{
  @Input() country:Country | undefined ;
 countryinfo:any | undefined;
  constructor(public dialog: MatDialog,private data:DataService){
  }
  ngOnInit(): void {
    this.data.getCountry(this.country.name).subscribe(data=>{
      this.countryinfo = data[0];
      console.log(this.countryinfo);
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: {country: this.country},
    });

    dialogRef.afterClosed().subscribe(data => {
      data.countryId = this.country.id;
      this.data.createCity(data).subscribe({
        next:city=>{
          this.country?.cities.push(city);
        }
      });
    });
  }
}
