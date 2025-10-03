import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user-plan',
  templateUrl: './add-user-plan.component.html',
  styleUrl: './add-user-plan.component.css'
})

export class AddUserPlanComponent implements OnInit {
  user: User | undefined;
  plan: Plan | undefined;
  constructor(private route: ActivatedRoute, public data: DataService, public accountService: AccountService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    var planid = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.currentUser$.subscribe(u => this.user = u);
    if (this.user) {
      
    }
    else {
      this.router.navigate(['/login/' + planid]);
    }
  }

  joinPlan(){
    var planid = Number(this.route.snapshot.paramMap.get('id'));
    this.data.getPlanById(planid).subscribe({
      next: plan => {
        this.data.addUserToPlan({ planId: planid, username: this.user.username, isAdmin: false }).subscribe({
          next: data => {
            this.toastr.success('Joined plan successfully');
            this.router.navigate(['/plan/' + planid]);
          },
          error: e => {
            this.toastr.error(e.error);
          }
        })
      },
      error: e => {
        this.toastr.error(e.error);
      }
    })
  }

  cancel(){
    this.router.navigate(['/']);
  }



}
