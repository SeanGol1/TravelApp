import { City } from "./city";
import { Country } from "./country";

export interface ToDo {
    id:number;
    name : string;    
    city: City;
    country: Country;
    sortOrder: number;
}

export interface ToDoUpdate{
    id: number; 
    name: string;
    cityId: number;
    countryId: number;
    sortOrder:number;
}