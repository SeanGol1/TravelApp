import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { DataService } from '../data.service';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DeletePlanConfirmationComponent } from '../plan/delete-plan-confirmation/delete-plan-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'TravelPlanner';
  user: User | undefined;
  modelPlan: any = {}
  planList: any[] = [];


  constructor(public data: DataService, public accountService: AccountService, private router: Router, public dialog: MatDialog,private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(u => this.user = u);
    if (this.user) {
      this.loadPlanList(this.user.username);
    }
    else {
      this.router.navigate(['/login']);
    }

  }

  // ngAfterViewInit(): void {
  //   this.accountService.currentUser$.subscribe(u=>this.user=u);
  //   if(this.user){
  //     this.loadPlanList(this.user.username);
  //   }

  // }

  createPlan() {
    this.modelPlan.username = this.user.username;
    this.data.createPlan(this.modelPlan).subscribe({
      next: plan => {
        this.planList.push(plan);
      },
      error: e => {
        console.log(e.error)
      }
    });
  }

  // deletePlan(plan: Plan) {
  //   const dialogRef = this.dialog.open(DeletePlanConfirmationComponent, {
  //     data: plan,
  //   });
  //   dialogRef.afterClosed().subscribe(_plan => {
  //     if (_plan) {
  //       this.data.deletePlan(_plan.id).subscribe({
  //         next: plan => {
  //           //this.planList.splice(this.planList.indexOf(plan), 1);
  //           this.removePlanFromList(plan.id);
  //         }
  //       })
  //     }
  //   });
  // }

  joinPlan() {
    this.modelPlan.username = this.user.username;
    this.modelPlan.password = "";
    this.data.joinPlan(this.modelPlan).subscribe({
      next: plan => {
        if (!this.planList.some(p => p.id === plan.id)) {
            this.planList.push(plan);
            this.toastr.success('You have joined the plan!');
          }
      },
      error: e => {
        console.log(e.error)
      }
    });
  }

  removePlanFromList(planId: number) {
    this.planList = this.planList.filter(p => p.id !== planId);
  }


  loadPlanList(username: string) {
    this.data.getPlanByUser(username).subscribe(plans => {
      this.planList = plans;
    })

  }

  loadPlan(id: number) {
    this.data.getPlanById(id).subscribe({
      next: plan => {
        //this.plan = plan
        this.data.updateLocalPlan(plan);
      }
    });
  }

  aiGenPlan() {
    this.router.navigate(['/aigenplan']);
  }



}
