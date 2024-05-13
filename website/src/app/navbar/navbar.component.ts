import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  model:any = {}

  constructor(public accountService:AccountService){}
  ngOnInit(): void {
    
  }  


  logout(){
    this.accountService.logout(); 
  }
}
