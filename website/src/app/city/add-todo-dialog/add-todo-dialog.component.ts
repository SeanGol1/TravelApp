import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.css'
})
export class AddTodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData, 
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface TodoDialogData {
  cityId: number;
  countryId: number;
  name: string;
}
