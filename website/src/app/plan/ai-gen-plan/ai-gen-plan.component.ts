import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-ai-gen-plan',
  templateUrl: './ai-gen-plan.component.html',
  standalone: false,
  styleUrls: ['./ai-gen-plan.component.css'],
})
export class AiGenPlanComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  public country: string;
  countryList: string[] = [];
  options: string[] = [];
  filteredOptions: string[];

  constructor(private data: DataService, private toastr: ToastrService, private router: Router,private accountService:AccountService) {
this.data.getRefCountryList().subscribe({
      next: countries => {
        this.options = countries.map(c => c.name);
        this.filteredOptions = this.options.slice();
      }
    });
  }

  addCountry(country:string) {
    this.countryList.push(country);
    this.country = "";
    this.input.nativeElement.value = '';
  }

  removeCountry(name: string) {
    this.countryList.findIndex(x => x == name);
    this.countryList.splice(this.countryList.findIndex(x => x == name), 1);

  }

    filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

      isInList(country: string): boolean {
  return this.countryList.includes(country);
}

  generatePlan() {
    if(this.countryList.length == 0){
      this.toastr.error("Please Add At Least One Country");
      return;
    }



    const plan: any = {};
    plan.countries = this.countryList;
    this.accountService.currentUser$.subscribe(user=>plan.username=user.username);
    this.data.aiGenPlan(plan).subscribe({
      next: response => {
        this.router.navigate(['/plan/' + response.id]);
      },
      error: e => {
        this.toastr.error("Error Generating Plan. Please Try Again Later.");
      }
    });
  }
}
