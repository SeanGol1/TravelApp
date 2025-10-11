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
user: User| undefined;

  constructor(private account:AccountService) {
  }


  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if(userString != '' && userString){
      const user:any = JSON.parse(userString);
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      if (user.datestamp && new Date(user.datestamp) > twentyFourHoursAgo) {
        this.account.setCurrentUser(user);
      }
      else{
        this.account.logout();
      }

      
    }
  }





}
