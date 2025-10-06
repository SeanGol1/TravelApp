import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { DeletePlanConfirmationComponent } from '../delete-plan-confirmation/delete-plan-confirmation.component';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-list-item',
  templateUrl: './plan-list-item.component.html',
  styleUrl: './plan-list-item.component.css'
})

export class PlanListItemComponent implements OnInit {
  @Input() plan:Plan;
  @Output() removed = new EventEmitter<number>(); // plan id
  isadmin:boolean;
  user: User | undefined;


  constructor(public data: DataService, public accountService: AccountService, private router: Router, public dialog: MatDialog,private toastr: ToastrService) {
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
    this.data.removeUserFromPlan(plan.id,this.user.username).subscribe({
      next: () => {
        this.toastr.success('You have left the plan!');
        this.removed.emit(plan.id); // Notify parent
      },
      error: e => {
        console.log(e);
        this.toastr.error(e.error);
      }
    });
  }

  deletePlan(plan: Plan) {
    const dialogRef = this.dialog.open(DeletePlanConfirmationComponent, {
      data: plan,
    });
    dialogRef.afterClosed().subscribe(_plan => {
      if (_plan) {
        this.data.deletePlan(_plan.id).subscribe({
          next: plan => {
            this.toastr.success('Plan deleted successfully');
            this.removed.emit(plan.id); // TODO: not working
          },
          error: e => {
            this.toastr.error(e.error);
          }
        })
      }
    });
  }
}
