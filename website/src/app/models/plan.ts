import { Country } from "./country";

export interface Plan {
    id:number;
    planName : string;
    countries: Country[];
    joinCode: number;
}