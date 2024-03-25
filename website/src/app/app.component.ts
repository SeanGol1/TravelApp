import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Plan } from './models/plan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'website';
  plan:Plan | undefined;

  constructor(private data:DataService){

  }

  ngOnInit(): void {
    this.data.getPlanById(2).subscribe({
      next: plan=> {
        this.plan = plan              
        console.log(plan);
      }
    });
  }
  
}
