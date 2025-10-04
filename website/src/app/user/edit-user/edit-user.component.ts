import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:User| undefined;
  usermodel: any = {};

  constructor(public accountService: AccountService, private toastr:ToastrService) {

   }

  ngOnInit(): void {
  this.accountService.currentUser$.subscribe(u=>this.user=u);
  this.usermodel.username = this.user?.username;
  }

  resetPW(){
    //TODO: Reset password logic
    if(this.usermodel.newpassword == this.usermodel.oldpassword){
      // alert("New password and confirm password do not match!");
      this.toastr.warning('Enter old password and then new password!');
      return;
    }
    // this.accountService.resetPassword(this.usermodel).subscribe({
    //   next: () => {
    //     this.toastr.success('Password reset successful!');
    //     // alert("Password reset successful!");
    //   },
    //   error: e => {
    //     console.log(e);
    //     // alert("Password reset failed!");
    //     this.toastr.error('Password reset failed!');
    //   }
    // });
  }

}
