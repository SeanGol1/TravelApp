import { Component, Input } from '@angular/core';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  @Input() plan:Plan | undefined ;

}
