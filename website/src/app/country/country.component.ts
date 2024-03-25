import { Component, Input } from '@angular/core';
import { Country } from '../models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  @Input() country:Country | undefined ;

}
