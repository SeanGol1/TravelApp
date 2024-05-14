import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{ 
  errorMessage:string = "";
  modelUser: any = {} 
  plan: Plan| undefined;
  user:User| undefined;;

  constructor(public data: DataService, public accountService: AccountService,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit(): void {
    this.errorMessage = '';

    this.accountService.currentUser$.subscribe(u=>this.user=u);
    if(this.user){
      this.router.navigate(['/']);
    }

    var planid = Number(this.route.snapshot.paramMap.get('id'));  
    if(planid){
      this.data.getPlanById(planid).subscribe({
        next: plan => {
          this.plan = plan
        }
      });
    }
  }

  login() {
    this.accountService.login(this.modelUser).subscribe({
      next: user => {
        this.accountService.currentUser$.subscribe(user => {
          if(!this.plan)
            this.router.navigate(['/']);
          else
            this.router.navigate(['/joinplan/'+ this.plan.id]);
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
      next: user=>{
        if(!this.plan)
          this.router.navigate(['/']);
        else
          this.router.navigate(['/joinplan/'+ this.plan.id]);
      },
      error: e => {
        console.log(e.error)
        this.errorMessage = e.error
      }
    });
  }

}
