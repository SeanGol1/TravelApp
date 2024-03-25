import { City } from "./city";
import { Country } from "./country";

export interface ToDo {
    id:number;
    name : string;    
    city: City;
    country: Country;
}

