import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerServiceService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient) { }

  //TODO: set up markers
  // makeCapitalMarkers(map: L.map): void { 
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //     for (const c of res.features) {
  //       const lon = c.geometry.coordinates[0];
  //       const lat = c.geometry.coordinates[1];
  //       const marker = L.marker([lat, lon]);
        
  //       marker.addTo(map);
  //     }
  //   });
  // }
}
