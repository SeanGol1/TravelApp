import { Component, Input } from '@angular/core';
import { Country } from '../models/country';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  @Input() country:Country | undefined ;

  constructor(public dialog: MatDialog,private data:DataService){
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: {country: this.country},
    });

    dialogRef.afterClosed().subscribe(data => {
      data.countryId = this.country?.id;
      this.data.createCity(data).subscribe({
        next:city=>{
          this.country?.cities.push(city);
        }
      });
    });
  }
}
