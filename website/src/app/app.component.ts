import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Plan } from './models/plan';
import { User, UserLogin } from './models/user';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TravelPlanner';
  plan: Plan | undefined;
  user: User | undefined;
  modelUser: any = {}
  modelPlan: any = {}
  planList: Plan[] = [];
  errorMessage:string = "";

  constructor(public data: DataService, public accountService: AccountService) {
  }


  ngOnInit(): void {
    this.errorMessage = ''
  }

  login() {
    this.accountService.login(this.modelUser).subscribe({
      next: user => {
        this.accountService.currentUser$.subscribe(user => {
          this.user = user;
          this.loadPlanList(user.username);
          this.errorMessage = ''
        })
      },
      error: e => {
        console.log(e.error)
        this.errorMessage = e.error
      }
    });
  }

  register() {
    this.accountService.register(this.modelUser).subscribe({
      error: e => {
        console.log(e.error)
        this.errorMessage = e.error
      }
    });
  }

  createPlan() {
    this.modelPlan.username = this.user.username;
    this.data.createPlan(this.modelPlan).subscribe({
      next:plan=>{
        this.planList.push(plan);
      },
      error: e => {
        console.log(e.error)
      }
    });
  }

  deletePlan(plan : Plan){
    this.data.deletePlan(plan.id).subscribe({
      next:()=>{
        this.planList.splice(this.planList.indexOf(plan),1);
      }
    })
  }

  joinPlan() {
    this.modelPlan.username = this.user.username;
    this.modelPlan.password = "";
    this.data.joinPlan(this.modelPlan).subscribe({
      next: plan =>{
        this.planList.push(plan);
      },
      error: e => {
        console.log(e.error)
      }
    });
  }

  loadPlanList(username: string) {
    this.data.getPlanByUser(username).subscribe(plans => {
      this.planList = plans;
    })

}

loadPlan(id: number){
  this.data.getPlanById(id).subscribe({
    next: plan => {
      this.plan = plan
      this.data.updateLocalPlan(plan);
    }
  });
}



}
