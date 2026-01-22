import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-delete-plan-confirmation',
  templateUrl: './delete-plan-confirmation.component.html',
  standalone: false,
  styleUrl: './delete-plan-confirmation.component.css'
})
export class DeletePlanConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePlanConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plan, private dataservice:DataService
  ) {}
  deletePlan() {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
