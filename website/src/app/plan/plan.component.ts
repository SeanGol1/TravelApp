import { Component, Input, Inject, OnInit } from '@angular/core';
import { Plan } from '../models/plan';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddCountryDialogComponent } from '../country/add-country-dialog/add-country-dialog.component';
import { DataService } from '../data.service';
import { AddCityDialogComponent } from '../city/add-city-dialog/add-city-dialog.component';
import { AddTodoDialogComponent } from '../todo/add-todo-dialog/add-todo-dialog.component';
import { AddTravelDialogComponent } from '../travel/add-travel-dialog/add-travel-dialog.component';
import { MapComponent } from '../map/map.component';
import { MapDialogComponent } from '../map/map-dialog/map-dialog.component';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { DeletePlanConfirmationComponent } from './delete-plan-confirmation/delete-plan-confirmation.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
  //@Input() plan: Plan | undefined;
  plan: Plan | undefined;
  user: User | undefined;
  isadmin:boolean = false;


  constructor(public dialog: MatDialog, public data: DataService,public account:AccountService,private route:ActivatedRoute, private router:Router,private toastr: ToastrService) {
  }
  
  ngOnInit(): void {
    var planid = Number(this.route.snapshot.paramMap.get('id'));  
    this.account.currentUser$.subscribe(u => this.user = u );
    if(this.user){
      
      //Get and Save Plan
      this.data.getPlanById(planid).subscribe({
        next: plan => {
          this.plan = plan
          this.data.updateLocalPlan(plan);
        }
      });

      //Check if user is admin
      this.data.isAdminCheck(planid,this.user.username).subscribe({
        next:isadmin=>{
          this.data.setLocalIsAdmin(isadmin);
        }
      })

    }
    else{
      this.router.navigate(['/']);
    }
    //this.data.plan$.subscribe(p=>this.plan = p)
  }

toggleNav(){
  this.data.updateNav();
}


  openCountryDialog(): void {
    const dialogRef = this.dialog.open(AddCountryDialogComponent, {
      data: { plan: this.plan },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      data.planId = this.plan?.id;
      // data.name = data.name.trim();
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

  openDeleteCountryDialog(): void {
    const dialogRef = this.dialog.open(DeletePlanConfirmationComponent);

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      data.planId = this.plan?.id;
      // data.name = data.name.trim();
      this.data.createCountry(data).subscribe({
        next: country => {
          this.toastr.success('Country removed successfully');
          this.plan?.countries.push(country);
        },
        error: e => {
          this.toastr.error(e.error);
        }
      });
    });
  }

  openCityDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: { plan: this.plan },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      //data.planId = this.plan?.id;
      //data.countryId = this.plan.;
      if (data) {
        this.data.createCity(data).subscribe({
          next: city => {
            this.toastr.success('City added successfully');
            this.plan.countries.forEach(c => {
              if (c.id == data.countryId)
                c.cities.push(city);
            });
          },
          error: e => {
            this.toastr.error(e.error);
          }
        });
      }
    });
  }

  checkToday(startdate:Date){   
    const today =  new Date(Date.now());
    const start = new Date(startdate);
    if(start > today )
      return true;
    else
      return false;
  }

  // openToDoDialog(): void {
  //   const dialogRef = this.dialog.open(AddTodoDialogComponent, {
  //     data: { plan: this.plan },
  //   });

  //   dialogRef.afterClosed().subscribe(data => {
  //     console.log('The dialog was closed');
  //     if(data){
  //     this.data.createTodo(data).subscribe({
  //       // next: todo => {
  //       //   this.plan.countries.forEach(c => {
  //       //     c.cities.forEach(city => {
  //       //       if (city.id == data.coun)
  //       //         city.toDos.push(todo);
  //       //     })

  //       //   });
  //       // }
  //     });}
  //   });
  // }

  exitPlan(){
    this.data.updateLocalPlan(null);
    //this.data.updateNav();
    this.router.navigate(['/']);

  }
  
  logout(){
    this.data.updateLocalPlan(null);
    //this.data.updateNav();
    this.account.logout();  
    this.router.navigate(['/']);
  
  }

  openTravelDialog(): void {
    const dialogRef = this.dialog.open(AddTravelDialogComponent, {
      data: { plan: this.plan },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if(data){
      this.data.createTravel(data).subscribe({
        next: travel => {
          this.toastr.success('Travel added successfully');
        },
        error: e => {
          this.toastr.error(e.error);
        }
      });}
    });
  }

  openMapDialog(): void {
    this.router.navigate(['/map/'+this.plan.id]);
    // const dialogRef = this.dialog.open(MapDialogComponent, {
    //   data: { plan: this.plan },
    //   height: '80%',
    //   width: '80%',
    // });

    // dialogRef.afterClosed().subscribe(data => {
    //   // console.log('The dialog was closed');
    //   // if(data){
    //   // this.data.createTravel(data).subscribe({
    //   //   next: travel => {
          
    //   //   }
    //   // });}
    // });
  }

}
