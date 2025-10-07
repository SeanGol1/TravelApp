import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account.service';
import { DataService } from 'src/app/data.service';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/toast.service';
import { environment } from 'src/environments/environment';

//declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ 
  errorMessage:string = "";
  modelUser: any = {} 
  plan: Plan| undefined;
  user:User| undefined;
  baseUrl = environment.apiUrl + 'google';

  constructor(public data: DataService, public accountService: AccountService,private route:ActivatedRoute,private router:Router,private toast: ToastrService) {
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

  //   google.accounts.id.initialize({
  //     client_id: 'YOUR_GOOGLE_CLIENT_ID',
  //     callback: this.handleCredentialResponse.bind(this),
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById('googleButton')!,
  //     { theme: 'outline', size: 'large' }
  //   );
   }

  // handleCredentialResponse(response: any) {
  //   const token = response.credential;
  //   // Send this token to your backend API
  //   fetch('https://yourapi.azurewebsites.net/api/auth/google', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ idToken: token })
  //   })
  //   .then(res => res.json())
  //   .then(user => {
  //     console.log('User logged in:', user);
  //   });
 // }

//   onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   this.modelUser.email = profile.getEmail();
//   this.modelUser.password = profile.getId();
//   this.register();
// }

  login() {
    this.accountService.login(this.modelUser).subscribe({
      next: user => {
        //this.toast.success('Login successful!');
        this.accountService.currentUser$.subscribe(user => {
          if(!this.plan)
            this.router.navigate(['/']);
          else
            this.router.navigate(['/joinplan/'+ this.plan.id]);
        })
      },
      error: e => {
        console.log(e.title);
        this.toast.error(e.error);
      }
    });
  }

  register() {
    this.accountService.register(this.modelUser).subscribe({
      next: user=>{
        this.toast.success('Registration successful!');
        if(!this.plan)
          this.router.navigate(['/']);
        else
          this.router.navigate(['/joinplan/'+ this.plan.id]);
      },
      error: e => {
        console.log(e.error);
        this.toast.error(e.error);

      }
    });
  }

}
