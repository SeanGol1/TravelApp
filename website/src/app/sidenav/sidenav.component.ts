import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AccountService } from '../account.service';
import { AddCountryDialogComponent } from '../country/add-country-dialog/add-country-dialog.component';
import { Plan } from '../models/plan';
import { MatDialog } from '@angular/material/dialog';
import { AddTravelDialogComponent } from '../travel/add-travel-dialog/add-travel-dialog.component';
import { MapDialogComponent } from '../map/map-dialog/map-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements AfterContentInit{
  plan:Plan;


constructor(public data:DataService, public userService: AccountService,public dialog: MatDialog,private toastr: ToastrService){}

  ngAfterContentInit(): void {
    this.data.plan$.subscribe(p=>this.plan=p);
  }



openCountryDialog(): void {
  this.data.updateNav();
  this.data.plan$.subscribe(p=>this.plan=p);
  const dialogRef = this.dialog.open(AddCountryDialogComponent, {
    data: { plan: this.plan },
  });

  dialogRef.afterClosed().subscribe(data => {
    console.log('The dialog was closed');
    data.planId = this.plan?.id;
    this.data.createCountry(data).subscribe({
      next: country => {
        this.toastr.success('Country added successfully');
        this.plan?.countries.push(country);
      },
      error: e => {
        this.toastr.error(e.error);
      }
    });
  });
}

openTravelDialog(): void {
  this.data.plan$.subscribe(p=>this.plan=p);
  this.data.updateNav();
  const dialogRef = this.dialog.open(AddTravelDialogComponent, {
    data: { plan: this.plan },
  });

  dialogRef.afterClosed().subscribe(data => {
    console.log('The dialog was closed');
    if(data){
    this.data.createTravel(data).subscribe({
      next: travel => {
        
      }
    });}
  });
}

openMapDialog(): void {
  this.data.plan$.subscribe(p=>this.plan=p);
  this.data.updateNav();
  const dialogRef = this.dialog.open(MapDialogComponent, {
    data: { plan: this.plan },
    height: '80%',
    width: '80%',
  });

  dialogRef.afterClosed().subscribe(data => {
    // console.log('The dialog was closed');
    // if(data){
    // this.data.createTravel(data).subscribe({
    //   next: travel => {
        
    //   }
    // });}
  });
}


exitPlan(){
  this.data.updateLocalPlan(null);
  this.data.updateNav();
}

logout(){
  this.data.updateLocalPlan(null);
  this.data.updateNav();
  this.userService.logout();


}
}
