import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PlanComponent } from './plan/plan.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { TodoComponent } from './todo/todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddCountryDialogComponent } from './country/add-country-dialog/add-country-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddCityDialogComponent } from './city/add-city-dialog/add-city-dialog.component';
import { AddTodoDialogComponent } from './todo/add-todo-dialog/add-todo-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  DragDrop,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { DragdropTestComponent } from './dragdrop-test/dragdrop-test.component';
import { CountryInfoDialogComponent } from './country/country-info-dialog/country-info-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { AddTravelDialogComponent } from './travel/add-travel-dialog/add-travel-dialog.component';
import { TrainAnimationComponent } from './travel/animations/train-animation/train-animation.component';
import { FlightAnimationComponent } from './travel/animations/flight-animation/flight-animation.component';
import { BusAnimationComponent } from './travel/animations/bus-animation/bus-animation.component';
import { WalkAnimationComponent } from './travel/animations/walk-animation/walk-animation.component';
import { ScooterAnimationComponent } from './travel/animations/scooter-animation/scooter-animation.component';
import { CityInfoDialogComponent } from './city/city-info-dialog/city-info-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import {CdkAccordionModule} from '@angular/cdk/accordion';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { MapComponent } from './map/map.component';
import * as L from 'leaflet';
import { MapDialogComponent } from './map/map-dialog/map-dialog.component';
import { MarkerServiceService } from './map/marker-service.service';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AddUserPlanComponent } from './plan/add-user-plan/add-user-plan.component';
import { LoginComponent } from './user/login/login.component';
import { DeletePlanConfirmationComponent } from './plan/delete-plan-confirmation/delete-plan-confirmation.component';
import { ChecklistDialogComponent } from './country/checklist-dialog/checklist-dialog.component';
import { ChecklistItemComponent } from './country/checklist-item/checklist-item.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    PlanComponent,
    CountryComponent,
    CityComponent,
    TodoComponent,
    AddCountryDialogComponent,
    AddCityDialogComponent,
    AddTodoDialogComponent,
    DragdropTestComponent,
    CountryInfoDialogComponent,
    AddTravelDialogComponent,
    TrainAnimationComponent,
    FlightAnimationComponent,
    BusAnimationComponent,
    WalkAnimationComponent,
    ScooterAnimationComponent,
    CityInfoDialogComponent,
    CountdownTimerComponent,
    MapComponent,
    MapDialogComponent,
    UserManagementComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    AddUserPlanComponent,
    LoginComponent,
    DeletePlanConfirmationComponent,
    ChecklistDialogComponent,
    ChecklistItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,     
    FormsModule, 
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CdkDropList, 
    CdkDrag,
    CdkDropListGroup,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    CdkAccordionModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    MatCheckboxModule

  ],
  providers: [  
    provideAnimationsAsync(),
    MatDatepickerModule,
    MarkerServiceService,
    [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
