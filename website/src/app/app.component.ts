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

  constructor(private data: DataService, public accountService: AccountService) {
  }


  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.modelUser).subscribe({
      next: user => {
        this.accountService.currentUser$.subscribe(user => {
          this.loadPlanList(user.username);
        })
      },
      error: e => {
        console.log(e.error)
      }
    });
  }

  register() {
    this.accountService.register(this.modelUser).subscribe({
      error: e => {
        console.log(e.error)
      }
    });
  }

  createPlan() {
    this.data.createPlan(this.modelPlan).subscribe({
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
