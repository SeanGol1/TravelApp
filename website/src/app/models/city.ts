import { Country } from "./country";
import { ToDo } from "./todo";

export interface City {
    id:number;
    name : string;
    country : Country;
    sortOrder: number;
    startDate: Date;
    endDate: Date;
    toDos: ToDo[];
}

export interface CityDialogData {
    countryId: number;
    name: string;
    sortOrder:number;
  }

  export interface UpdateCityDialogData {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    countryId: number;
    sortOrder: number;
  }