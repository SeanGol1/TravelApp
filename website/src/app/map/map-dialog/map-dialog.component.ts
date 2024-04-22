import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrl: './map-dialog.component.css'
})
export class MapDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plan, private dataservice: DataService
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
