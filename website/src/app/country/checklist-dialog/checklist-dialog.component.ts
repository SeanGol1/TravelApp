import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { ChecklistItem, ChecklistItemDialogData } from 'src/app/models/checklistitem';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrl: './checklist-dialog.component.css'
})

export class ChecklistDialogComponent implements OnInit{
  checklistitems: ChecklistItem[] = [];
  newitem: ChecklistItemDialogData = {name:'',countryId:this.data.country.id};


  constructor(
    public dialogRef: MatDialogRef<ChecklistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {country:Country},
    private dataservice: DataService
  ) { }

  ngOnInit(): void {
    this.dataservice.getChecklistItemByCountry(this.data.country.id).subscribe({
      next:items=>{
        this.checklistitems=items;
      }
    })
  }

  addItem(){
    this.newitem.countryId = this.data.country.id;
    this.dataservice.createChecklistItem(this.newitem).subscribe({
      next:item=>{
        this.checklistitems.push(item);
      }
    })
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
