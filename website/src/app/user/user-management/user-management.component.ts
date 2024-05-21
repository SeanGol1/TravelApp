import { Component } from '@angular/core';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { PlanComponent } from 'src/app/plan/plan.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  plan:Plan | undefined;
  model:any={};
  userList:any = [];
  copycode:string = "";


  constructor(private data:DataService,private accountService:AccountService){
    this.data.plan$.subscribe(plan=>{
      this.plan = plan;
      this.copycode = 'https://backpackererapp.web.app/joinplan/'+plan.id;
    })

    this.GetUserList();

  }

  GetUserList(){
    this.data.getUserByPlanId(this.plan.id).subscribe(userlist=>{
      //this.userList = userlist;
      userlist.forEach(user => {
        this.data.isAdminCheck(this.plan.id, user.userName).subscribe({
          next:isadmin=>{
            user.isadmin = isadmin;
            this.userList.push(user);
          }
        });
      });
    })

    
  }

  AddUser(){
    let data = {planId:this.plan.id, username:this.model.username}
    this.data.addUserToPlan(data).subscribe({
      next: ()=> {
        this.userList.push(this.model.username)
      }
    });
  }

  copyText(){

   // Copy the text inside the text field
  navigator.clipboard.writeText(this.copycode);

  // Alert the copied text
  alert("Copied the text: " + this.copycode);
  }
}
