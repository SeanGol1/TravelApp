import { Component, Input } from '@angular/core';
import { ToDo } from '../models/todo';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo:ToDo | undefined ;

  constructor(public data:DataService,private toastr: ToastrService) {
  }

  deleteTodo(){
    this.data.deleteToDo(this.todo.id).subscribe({
      next: city => {
        this.toastr.success('ToDo deleted successfully');
      }
    });
  }
}
