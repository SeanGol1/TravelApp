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
    if(userString != ''){
      const user:User = JSON.parse(userString);    
      this.account.setCurrentUser(user);
    }
  }





}
