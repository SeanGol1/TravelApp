import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { City } from 'src/app/models/city';
import { ToastService } from 'src/app/toast.service';
import { TodoDialogData } from 'src/app/todo/add-todo-dialog/add-todo-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  city: City;
  baseUrl = environment.apiUrl;
  attractions: any[];

  constructor(private activatedRoute:ActivatedRoute,public data: DataService,private toastr:ToastService,private router:Router,private title: Title, private meta: Meta){

  }

  ngOnInit(): void {
    var cityname = String(this.activatedRoute.snapshot.paramMap.get('city'));  
    // this.city = this.data.getCity(cityname);
    this.data.getCityByName(cityname).subscribe({
      next: data=>{
        if(!data.refCity){
          this.toastr.error('City not found');
        }
        this.city=data.refCity;
        this.attractions = data.refCityAttractions;
          this.title.setTitle('Travel To '+this.city.name+' - Backpackerer');
          this.meta.updateTag({ name: 'description', content: 'Explore '+this.city.name+' with our AI-generated travel plans.' });
           this.meta.updateTag({ name: 'keywords', content: 'travel, '+this.city.name+', itinerary, backpacker, plan' });

      },
      error: e=>{
        this.toastr.error('Could not load city details');
        this.router.navigate(['/']);
      }
    })
  }

  addAttraction(name:string){
    var todo: TodoDialogData = {
      cityId:  this.city.id,
      countryId: this.city.countryId,
      name: name
    };
  
    this.data.createTodo(todo).subscribe({
      next: todo => {
        this.toastr.success('Item added to ToDo list');
        this.data.plan$.subscribe(plan => {
                    plan.countries.forEach(c => {
                        c.cities.forEach(ct => {
                            if(ct.id == this.city.id){
                                ct.toDos.push(todo);   
                        }
                        })
                    })
                });
      },
      error: e => {
        this.toastr.error(e.error);
      }
    });
  }
}
