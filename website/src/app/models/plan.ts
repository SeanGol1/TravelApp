import { Country } from "./country";

export interface Plan {
    id:number;
    planname : string;
    countries: Country[];
}