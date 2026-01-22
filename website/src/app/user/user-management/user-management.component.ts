import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { PlanComponent } from 'src/app/plan/plan.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  standalone: false,
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  plan: Plan | undefined;
  model: any = {};
  userList: any = [];
  copycode: string = "";


  constructor(private data: DataService, private accountService: AccountService, private toastr: ToastrService) {
    this.data.plan$.subscribe(plan => {
      this.plan = plan;
      this.copycode = 'https://backpackererapp.web.app/joinplan/' + plan.id;
    })

    if (this.plan)
      this.GetUserList();

  }

  GetUserList() {
    this.userList = [];
    this.data.getUserByPlanId(this.plan.id).subscribe(userlist => {
      this.userList = userlist;
    })
  }


  AddUser() {
    let data = { planId: this.plan.id, username: this.model.username }
    this.data.addUserToPlan(data).subscribe({
      next: (resp) => {
        if(resp == 200){
        this.toastr.success('User added successfully!');
        this.GetUserList();
        }
        else{
          this.toastr.error('User not found!');
        }
      },
      error: e => {
        console.log(e);
        this.toastr.error(e.error.title||e.error||e.message );
      }
    });
  }

  copyText() {

    navigator.clipboard.writeText(this.copycode);
    alert("Copied the text: " + this.copycode);

  }

  removeUser(user: any) {
    if (confirm("Are you sure to remove user " + user.username + "?")) {
      this.data.removeUserFromPlan(this.plan.id, user.username).subscribe({
        next: () => {
          this.toastr.success('User removed successfully!');
          this.GetUserList();
        }, error: e => {
          console.log(e);
          this.toastr.error(e.error.title||e.error||e.message);
        }
      });
    }
  }

  setAdmin(user: any) {
    this.data.setAdmin(this.plan.id, user.username).subscribe({
      next: () => {
        this.toastr.success( user.username + ' admin settings updated!');
        this.GetUserList();
      }, error: e => {
        console.log(e);
        this.toastr.error(e.error.title||e.error||e.message);
      }
    });
  }
}
