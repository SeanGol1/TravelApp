import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css'
})
export class CityDetailsComponent implements OnInit {
  city: City;

  constructor(private activatedRoute:ActivatedRoute,private data: DataService){

  }

  ngOnInit(): void {
    var cityname = String(this.activatedRoute.snapshot.paramMap.get('city'));  
    // this.city = this.data.getCity(cityname);
    this.data.getCityByName(cityname).subscribe({
      next: city=>{
        this.city=city;
        console.log(this.city);
      },
      error: e=>{
        console.log(e);
      }
    })
  }
}
