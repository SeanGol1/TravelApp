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
import { ToDo, ToDoUpdate } from '../models/todo';
import { Travel, TravelType } from '../models/travel';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{
  @Input() city:City;
  plan:Plan | undefined ;
  todo:ToDoUpdate | undefined ;
  travel:Travel | undefined;
  enum: typeof TravelType = TravelType;

  constructor(public dialog: MatDialog,private data:DataService){    
  }

  ngOnInit(): void {
    this.data.getTravelByCityId(this.city.id).subscribe(data=>{
      this.travel = data;
    })
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      
      this.todo = event.item.data;
      this.todo.cityId = this.city.id;
      //this.todo.countryId = 0; //TODO: set country.  //this.city.country.id === null ? this.city.country.id:0; 
      this.todo.sortOrder = event.currentIndex;

      this.data.updateTodo(this.todo).subscribe(todo=>{
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.todo = event.item.data;
      this.todo.cityId = this.city.id;
      //this.todo.countryId = 0; //TODO: set country.  //this.city.country.id === null ? this.city.country.id:0; 
      this.todo.sortOrder = event.currentIndex;

      this.data.updateTodo(this.todo).subscribe(todo=>{
        
      });
    }
  }

  getCityDropList(){
    let list: string[] = [];
    this.data.plan$.subscribe({
      next: plan=> {
        this.plan = plan              
        plan.countries.forEach(country => {
          country.cities.forEach(city => {
            list.push('drop'+city.id);
          });
        });
      }
    })
    // this.data.getPlanById(2).subscribe({
    //   next: plan=> {
    //     this.plan = plan              
    //     plan.countries.forEach(country => {
    //       country.cities.forEach(city => {
    //         list.push('drop'+city.id);
    //       });
    //     });
    //   }
    // });
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
