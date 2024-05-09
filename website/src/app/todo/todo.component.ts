import { Component, Input } from '@angular/core';
import { ToDo } from '../models/todo';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo:ToDo | undefined ;

  constructor(private data:DataService){
  }

  deleteTodo(){
    this.data.deleteToDo(this.todo.id).subscribe({
      next: city => {
      }
    });
  }
}
