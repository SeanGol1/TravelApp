import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dragdrop-test',
  templateUrl: './dragdrop-test.component.html',
  styleUrls: ['./dragdrop-test.component.css']
})
export class DragdropTestComponent {

  list1: string[] = ["Test1","Test2","nyhtfnjy"]
  list2: string[] = ["Test3","Test4"]
  list3: string[] = ["Test5","Test6"]

  drop(event: CdkDragDrop<string[]>) {
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
}
