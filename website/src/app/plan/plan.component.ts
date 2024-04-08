import { Component, Input ,Inject} from '@angular/core';
import { Plan } from '../models/plan';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddCountryDialogComponent } from './add-country-dialog/add-country-dialog.component';
import { DataService } from '../data.service';
import { AddCityDialogComponent } from '../country/add-city-dialog/add-city-dialog.component';
import { AddTodoDialogComponent } from '../city/add-todo-dialog/add-todo-dialog.component';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  @Input() plan:Plan | undefined ;

  constructor(public dialog: MatDialog,private data:DataService){
  }

  openCountryDialog(): void {
    const dialogRef = this.dialog.open(AddCountryDialogComponent, {
      data: {plan: this.plan},
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      data.planId = this.plan?.id;
      this.data.createCountry(data).subscribe({
        next:country=>{
          this.plan?.countries.push(country);
        }
      });
    });
  }

  openCityDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: {plan: this.plan},
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      //data.planId = this.plan?.id;
      //data.countryId = this.plan.;
      this.data.createCity(data).subscribe({
        next:city=>{
          this.plan.countries.forEach(c => {
            if(c.id == data.countryId)
              c.cities.push(city);
          }); 
        }
      });
    });
  }

  openToDoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: {plan: this.plan},
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      this.data.createTodo(data).subscribe({
        next:todo=>{
          this.plan.countries.forEach(c => {
            c.cities.forEach(city=>{
              if(city.id == data.coun)
                city.toDos.push(todo);
            })
            
          }); 
        }
      });
    });
  }

}
