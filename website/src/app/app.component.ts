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
  user:User | undefined;
  model:any={}

  constructor(private data: DataService,public accountService: AccountService) {
  }


  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.model).subscribe({
      error:e=>{
        console.log(e.error)
      }
    });
  }

  register(){
    this.accountService.register(this.model).subscribe({
      error:e=>{
        console.log(e.error)
      }
    });
  }

  loadPlan(id:number){
    this.data.getPlanById(id).subscribe({
      next: plan => {   
        this.plan = plan
        this.data.updateLocalPlan(plan);
      }
    });
  }



}
