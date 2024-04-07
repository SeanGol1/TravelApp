import { Component, Input, OnInit } from '@angular/core';
import { City } from '../models/city';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Plan } from '../models/plan';
import { ToDo } from '../models/todo';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{
  @Input() city:City;
  plan:Plan | undefined ;

  dropCityVariableName: string | undefined;

  constructor(public dialog: MatDialog,private data:DataService){    
  }

  ngOnInit(): void {
    // if(this.city)
    //   this.dropCityVariableName = '#drop' + this.city?.id;
    // else
    //   this.dropCityVariableName =   "#drop" + Math.random().toString(16).slice(2)
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getCityDropList(){
    let list: string[] = [];
    this.data.getPlanById(2).subscribe({
      next: plan=> {
        this.plan = plan              
        plan.countries.forEach(country => {
          country.cities.forEach(city => {
            list.push('drop'+city.id);
          });
        });
      }
    });
    return list;
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if(this.city)
  //     moveItemInArray(this.city?.toDos, event.previousIndex, event.currentIndex);
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: {city: this.city},
    });

    dialogRef.afterClosed().subscribe(data => {
      data.cityId = this.city?.id;      
      // if(this.city?.country.id)
      //   data.countryId = this.city?.country.id;
      // else
      //   data.countryId = 0;
      this.data.createTodo(data).subscribe({
        next:todo=>{
          this.city?.toDos.push(todo);
        }
      });
    });
  }
}
