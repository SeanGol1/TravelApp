import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddCityDialogComponent } from '../city/add-city-dialog/add-city-dialog.component';
import { CountryInfoDialogComponent } from './country-info-dialog/country-info-dialog.component';
import { formatDate } from "@angular/common";
import { Travel } from '../models/travel';
import { City, UpdateCityDialogData } from '../models/city';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @Input() country: Country | undefined;
  countryinfo: any | undefined;
  travel: Travel | undefined;
  city: City | undefined;


  constructor(public dialog: MatDialog, private data: DataService) {
  }

  ngOnInit(): void {
    this.data.getCountry(this.country.name).subscribe(data => {
      this.countryinfo = data[0];
      console.log(this.countryinfo);
    });
  }

  //Update every city other than the drop city. 
  updateOrder(newIndex: number) {
    this.country.cities.forEach(city => {
      if (city.id != this.city.id) {
        if (city.sortOrder >= newIndex) {
          city.sortOrder += 1;
        }
        else if (city.sortOrder < newIndex && city.sortOrder > this.city.sortOrder) {
          city.sortOrder -= 1;
        }
      }
    });
    // this.country.cities = Object.assign([], this.itemArray.items);
  }

  drop(event: CdkDragDrop<City[]>) {
    if (event.previousContainer === event.container) {
      this.city = event.item.data;
      let indexToUpdate = this.country.cities.findIndex(city => city.id === this.city.id);
      if (indexToUpdate != event.currentIndex) {
        this.updateOrder(event.currentIndex);
        this.city.sortOrder = event.currentIndex;
        this.country.cities[indexToUpdate] = this.city;


        this.data.updateCitySort(this.country.cities).subscribe(city => {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.city = event.item.data;
      //this.city.countryId = this.city.id;
      //this.todo.countryId = 0; //TODO: set country.  //this.city.country.id === null ? this.city.country.id:0; 
      this.city.sortOrder = event.currentIndex;

      // this.data.updateCity(this.city).subscribe(city => {

      // });
    }
  }

  getDate(date: Date) {
    if (date)
      return formatDate(date, 'dd MMM', 'en-GB')
    else
      return ''
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(CountryInfoDialogComponent, {
      data: this.country,
    });

    dialogRef.afterClosed().subscribe(c => {
      //data.countryId = this.country.id;

      this.data.updateCountry(c).subscribe({
        next: country => {
          //this.country = country
        }
      });

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: { country: this.country },
    });

    dialogRef.afterClosed().subscribe(data => {
      data.countryId = this.country.id;
      this.data.createCity(data).subscribe({
        next: city => {
          this.country?.cities.push(city);
        }
      });
    });
  }
}
