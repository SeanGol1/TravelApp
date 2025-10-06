import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import { Plan } from '../models/plan';
import { ChecklistDialogComponent } from './checklist-dialog/checklist-dialog.component';
import { findIndex } from 'rxjs';
import {ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, AfterViewInit {
  @Input() country: Country | undefined;
  @Input() countryinfo: any | undefined;
  travel: Travel | undefined;
  city: City | undefined;
  plan: Plan | undefined;
  numOfDays: string | '';
  currency:any = [];


  constructor(public dialog: MatDialog, public data: DataService, private toastr: ToastrService) {
  }
  ngAfterViewInit(): void {

    //Change so it calls all
    // this.data.getCountry(this.country.name).subscribe(data => {
    //   this.countryinfo = data;
    // });

    this.numOfDays = this.getDays().toString();
  }

  ngOnInit(): void {

  }

  // onTabChange(event: MatTabChangeEvent) {
  //   if (event.tab.textLabel === 'Details' ) { 
  //   this.data.getCountry(this.country.name).subscribe(data => {
  //     this.countryinfo = data;
  //   });
  //   }
  // }

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
          this.toastr.success('Order updated');
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

  getDays() {
    this.data.plan$.subscribe({
      next: plan => {
        this.plan = plan;
      }
    })

    const index = this.plan.countries.findIndex(c => c.id == this.country.id);

    if (this.plan.countries[index + 1].startDate != null) {
      const start: Date = new Date(this.country.startDate);
      const end: Date = new Date(this.plan.countries[index + 1].startDate);

      const diff = end.getTime() - start.getTime();
      return Math.round(diff / (1000 * 3600 * 24));
    }
    else {
      return '';
    }
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(CountryInfoDialogComponent, {
      data: this.country,
    });

    dialogRef.afterClosed().subscribe({
      next: c => {
        if(c){
        //data.countryId = this.country.id;
        this.data.updateCountry(c).subscribe({
          next: country => {
            this.toastr.success('Country updated');
            //this.country = country //TODO: Update Plan
          },
          error: e => {
            this.toastr.error(e.error);
          }
        });
      }
      },
      error: e => console.log(e)
    });
  }

  openCityDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: { country: this.country },
    });

    dialogRef.afterClosed().subscribe({
      next: data => {
        data.countryId = this.country.id;
        this.data.createCity(data).subscribe({
          next: city => {
            this.toastr.success('City added successfully');
            this.country?.cities.push(city);
          },
          error: e => {
            this.toastr.error(e.error);
          }
        });
      },
      error: e => console.log(e)
    });
  }

  deleteCountry(){
    this.data.deleteCountry(this.country.id).subscribe({
      next: country => {
      }
    });
  }

  openChecklistDialog(){
    //TODO: get to do checklist
    const dialogRef = this.dialog.open(ChecklistDialogComponent, {
      data: { country: this.country },
    });

    dialogRef.afterClosed().subscribe({
      next: data => {
        // data.countryId = this.country.id;
        // this.data.createCity(data).subscribe({
        //   next: city => {
        //     this.country?.cities.push(city);
        //   }
        // });
      },
      error: e => console.log(e)
    });
  }
}
