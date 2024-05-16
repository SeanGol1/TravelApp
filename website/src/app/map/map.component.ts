import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import markerIconPng from "leaflet/dist/images/markerIconPng"
import {Icon} from 'leaflet'
import { Plan } from '../models/plan';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() plan:Plan

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 15.8700, 100.9925 ],
      zoom: 3
    });
    
    const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: ''
    });

    
    tiles.addTo(this.map);

    const myIcon = L.icon({
      iconUrl: '/marker-icon.png'
   });

    this.data.plan$.subscribe(p=> this.plan=p)
    this.data.getRefCityList(this.plan.id).subscribe(_list=>{
      let list = _list;
      list.forEach(refcity => {

        var marker = L.marker([refcity.lat, refcity.lng],{icon: myIcon}).addTo(this.map);
        //marker.bindPopup(refcity.name).openPopup();
      });
      
    })
    
  }

  constructor(private data:DataService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
}
