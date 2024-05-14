import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { DataService } from '../data.service';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'TravelPlanner';
  user: User | undefined;
  modelPlan: any = {}
  planList: Plan[] = [];
  

  constructor(public data: DataService, public accountService: AccountService,private router: Router) {
  }


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(u=>this.user=u);
    if(this.user){
      this.loadPlanList(this.user.username);
    }
    else{
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
      //this.plan = plan
      this.data.updateLocalPlan(plan);
    }
  });
}



}
