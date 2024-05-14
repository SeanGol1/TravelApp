import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  model:any = {}

  constructor(public accountService:AccountService,private router:Router){}
  ngOnInit(): void {
    
  }  


  logout(){
    this.accountService.logout(); 
    this.router.navigate(['/login']);
  }
}
