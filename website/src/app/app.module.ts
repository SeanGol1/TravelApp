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
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddCountryDialogComponent } from './plan/add-country-dialog/add-country-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddCityDialogComponent } from './country/add-city-dialog/add-city-dialog.component';
import { AddTodoDialogComponent } from './city/add-todo-dialog/add-todo-dialog.component';
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
    CountryInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
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
    MatNativeDateModule 
  ],
  providers: [  
    provideAnimationsAsync(),
    MatDatepickerModule,
    [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
