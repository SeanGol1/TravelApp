import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import markerIconPng from "leaflet/dist/images/markerIconPng"
import { Icon } from 'leaflet'
import { Plan } from '../models/plan';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  @Input() plan: Plan
  allMarkerList: any = [];
  pastMarkerList: any = [];
  allMarker: boolean = true; 
  refCityList: any = [];

  private map;

  private initMap(lat:number,lng:number ): void {
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 3
    });

    const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=beb52c10-67f9-4aa0-8323-bfc953c9efe5', {
      maxZoom: 18,
      minZoom: 3,
      attribution: ''
    });


    tiles.addTo(this.map);

    

  }

  private initMarkers(){

    const myIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png'
    });

    this.data.plan$.subscribe(p => this.plan = p)
    this.data.getRefCityList(this.plan.id).subscribe(_list => {
      this.refCityList = _list;
      this.initMap(this.refCityList[0].lat,this.refCityList[0].lng)
      let last = null;
      this.refCityList.forEach(refcity => {

        var marker = L.marker([refcity.lat, refcity.lng], { icon: myIcon }).addTo(this.map);
        marker.bindPopup(refcity.name);
        this.allMarkerList.push(marker);
        if (last) {
          var polygon = L.polygon([
            [last.lat, last.lng],
            [refcity.lat,refcity.lng],
            [refcity.lat,refcity.lng]
          ]).addTo(this.map);
        }
        last = refcity;

      });
    })



  }

  constructor(private data: DataService) { }

  ngAfterViewInit(): void {
    this.initMarkers();
  }

}
