import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { City } from '../models/city';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddTodoDialogComponent, TodoDialogData } from '../todo/add-todo-dialog/add-todo-dialog.component';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   transferArrayItem,
//   CdkDrag,
//   CdkDropList,
// } from '@angular/cdk/drag-drop';
import { Plan } from '../models/plan';
import { ToDo, ToDoUpdate } from '../models/todo';
import { Travel, TravelType } from '../models/travel';
import { CityInfoDialogComponent } from './city-info-dialog/city-info-dialog.component';
import { AddTravelDialogComponent } from '../travel/add-travel-dialog/add-travel-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements AfterViewInit {
  @Input() city: City;
  plan: Plan | undefined;
  todo: ToDoUpdate | undefined;
  travel: Travel | undefined;
  enum: typeof TravelType = TravelType;
  attractions: any[];

  constructor(public dialog: MatDialog, public data: DataService) {
  }

  ngAfterViewInit(): void {
    this.data.getTravelByCityId(this.city.id).subscribe({
      next: (data) => this.travel = data,
      error: (e) => console.log(e)
    })

    this.data.plan$.subscribe(p=>{
      this.plan = p;
    })
  }


  onTabChange(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'Details' && !this.attractions  ) { //
    // this.data.getCityAttractions(this.city.name).subscribe({
    //   next: (atts) => this.attractions = atts,
    //   error: (e) => console.log(e)
    //});



    //this.getCityAttractions(this.city.name);

    this.data.getCityAttractions(this.city.name)
      .then(atts => this.attractions = atts)
      .catch(err => console.log(err));
  }
}

addAttraction(name:string){
  var todo: TodoDialogData = {
    cityId:  this.city.id,
    countryId: this.city.countryId,
    name: name
  };

  // todo.cityId = this.city.id;
  // todo.countryId = this.city.countryId;
  // todo.name = name;
  this.data.createTodo(todo).subscribe({
    next: resp => console.log(resp)
  });
}

// getCityAttractions(cityName: string): Observable<any> {
//   if (this.attractionsCache.has(cityName)) {
//     return of(this.attractionsCache.get(cityName)); // return cached data
//   }

//   return this.data.getCityAttractions(this.city.name).pipe(
//     tap(atts => this.attractionsCache.set(cityName, atts))
//   );
// }

  // drop(event: CdkDragDrop<ToDo[]>) {
  //   if (event.previousContainer === event.container) {

  //     this.todo = event.item.data;
  //     this.todo.cityId = this.city.id;
  //     //this.todo.countryId = 0; //TODO: set country.  //this.city.country.id === null ? this.city.country.id:0; 
  //     this.todo.sortOrder = event.currentIndex;

  //     this.data.updateTodo(this.todo).subscribe(todo=>{
  //       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     });
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );

  //     this.todo = event.item.data;
  //     this.todo.cityId = this.city.id;
  //     //this.todo.countryId = 0; //TODO: set country.  //this.city.country.id === null ? this.city.country.id:0; 
  //     this.todo.sortOrder = event.currentIndex;

  //     this.data.updateTodo(this.todo).subscribe(todo=>{

  //     });
  //   }
  // }

  // getCityDropList(){
  //   let list: string[] = [];
  //   this.data.plan$.subscribe({
  //     next: plan=> {
  //       this.plan = plan              
  //       plan.countries.forEach(country => {
  //         country.cities.forEach(city => {
  //           list.push('drop'+city.id);
  //         });
  //       });
  //     }
  //   })
  //   // this.data.getPlanById(2).subscribe({
  //   //   next: plan=> {
  //   //     this.plan = plan              
  //   //     plan.countries.forEach(country => {
  //   //       country.cities.forEach(city => {
  //   //         list.push('drop'+city.id);
  //   //       });
  //   //     });
  //   //   }
  //   // });
  //   return list;
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   if(this.city)
  //     moveItemInArray(this.city?.toDos, event.previousIndex, event.currentIndex);
  // }

  openAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: { city: this.city },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        data.cityId = this.city?.id;
        this.data.createTodo(data).subscribe({
          next: todo => {
            if (todo) {
              this.data.plan$.subscribe(plan => {
                  plan.countries.forEach(c => {
                      c.cities.forEach(ct => {
                          if(ct.id == data.cityId){
                              ct.toDos.push(todo);   
                      }
                      })
                  })
              });
          }
          }
        });
      }
    });

  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(CityInfoDialogComponent, {
      data: this.city,
    });

    dialogRef.afterClosed().subscribe(c => {
      if (c) {
        //data.countryId = this.country.id;

        this.data.updateCity(c).subscribe({
          next: city => {
            //this.country = country
            //TODO: fix list.
          }
        });
      }
    });
  }

  deleteCity() {
    this.data.deleteCity(this.city.id).subscribe({
      next: city => {
      }
    });
  }

  openTravelDialog(): void {
    const dialogRef = this.dialog.open(AddTravelDialogComponent, {
      data: { city: this.city },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if(data){
      this.data.createTravel(data).subscribe({
        next: travel => {
          this.travel = travel
        }
      });}
    });
  }

  deleteTravel(){
    this.data.deleteTravel(this.travel.id).subscribe(travel=>{
      this.travel = undefined;
    })
  }
}
