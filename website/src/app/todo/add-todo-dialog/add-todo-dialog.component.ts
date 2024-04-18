import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.css'
})
export class AddTodoDialogComponent implements OnInit{
  todo: TodoDialogData = {cityId: 0, name: '',countryId:0};
  cityList: City[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {plan:Plan}, 
  ) { }
  ngOnInit(): void {
    this.data.plan.countries.forEach(country => {      
      country.cities.forEach(city=>{
        this.cityList.push(city);
      })
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterCity(){
    this.cityList = [];
    this.data.plan.countries.forEach(country => {      
      country.cities.forEach(city=>{
        if(country.id == this.todo.countryId)
        this.cityList.push(city);
      })
    });
    //this.cityList.filter((c)=>c.country.id == this.todo.countryId);
  }
}

export interface TodoDialogData {
  cityId: number;
  countryId: number;
  name: string;
}
