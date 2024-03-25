import { City } from "./city";
import { Plan } from "./plan";

export interface Country {
    id:number;
    name : string;
    plan : Plan;
    cities: City[];
}