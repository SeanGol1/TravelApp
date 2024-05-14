import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddUserPlanComponent } from './plan/add-user-plan/add-user-plan.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '',  component:HomeComponent},
  { path: 'plan/:id', component: PlanComponent },
  { path: 'joinplan/:id', component: AddUserPlanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }