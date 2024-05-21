import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { DeletePlanConfirmationComponent } from '../delete-plan-confirmation/delete-plan-confirmation.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-plan-list-item',
  templateUrl: './plan-list-item.component.html',
  styleUrl: './plan-list-item.component.css'
})

export class PlanListItemComponent implements OnInit {
  @Input() plan:Plan;
  isadmin:boolean;
  user: User | undefined;

  constructor(public data: DataService, public accountService: AccountService, private router: Router, public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user=>this.user=user);
    this.data.isAdminCheck(this.plan.id, this.user.username).subscribe({
      next:isadmin=>{
        this.isadmin = isadmin;
      }
    })
  }

  leavePlan(plan:Plan){
    
  }

  deletePlan(plan: Plan) {
    const dialogRef = this.dialog.open(DeletePlanConfirmationComponent, {
      data: plan,
    });
    dialogRef.afterClosed().subscribe(_plan => {
      if (_plan) {
        this.data.deletePlan(_plan.id).subscribe({
          next: plan => {
            //TODO: remove from list
            //this.planList.splice(this.planList.indexOf(plan), 1);
          }
        })
      }
    });
  }
}
