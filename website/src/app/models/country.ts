import { City } from "./city";
import { Plan } from "./plan";

export interface Country {
    id:number;
    name : string;
    plan : Plan;
    startDate:Date;
    endDate:Date;
    sortOrder: number;
    cities: City[];
}

export interface UpdateCountryDialogData {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    sortOrder: number;
  }