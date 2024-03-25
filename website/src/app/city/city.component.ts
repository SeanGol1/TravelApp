import { Component, Input } from '@angular/core';
import { City } from '../models/city';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  @Input() city:City | undefined ;

  constructor(public dialog: MatDialog,private data:DataService){
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: {city: this.city},
    });

    dialogRef.afterClosed().subscribe(data => {
      data.cityId = this.city?.id;
      //data.countryId = this.city?.country.id;
      this.data.createTodo(data).subscribe({
        next:todo=>{
          this.city?.toDos.push(todo);
        }
      });
    });
  }
}
