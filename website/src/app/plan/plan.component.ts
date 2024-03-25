import { Component, Input ,Inject} from '@angular/core';
import { Plan } from '../models/plan';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddCountryDialogComponent } from './add-country-dialog/add-country-dialog.component';
import { DataService } from '../data.service';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  @Input() plan:Plan | undefined ;

  constructor(public dialog: MatDialog,private data:DataService){
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCountryDialogComponent, {
      data: {plan: this.plan},
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      data.planId = this.plan?.id;
      this.data.createCountry(data).subscribe({
        next:country=>{
          this.plan?.countries.push(country);
        }
      });
    });
  }

}
