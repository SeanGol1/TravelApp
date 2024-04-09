import { Country } from "./country";
import { ToDo } from "./todo";

export interface City {
    id:number;
    name : string;
    country : Country;
    sortOrder: number;
    toDos: ToDo[];
}

export interface CityDialogData {
    countryId: number;
    name: string;
    sortOrder:number;
  }