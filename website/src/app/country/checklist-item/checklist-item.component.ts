import { Component, Input, input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ChecklistItem } from 'src/app/models/checklistitem';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  standalone: false,
  styleUrl: './checklist-item.component.css'
})
export class ChecklistItemComponent {
  @Input() item: ChecklistItem;

  constructor(private data:DataService){

  }

  updateChecked(){
    this.data.updateChecklistItem(this.item).subscribe({
      next:item=>{
        this.item = item;
      }
    })
  }

}
