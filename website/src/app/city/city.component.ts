import { Component, Input } from '@angular/core';
import { City } from '../models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  @Input() city:City | undefined ;

}
