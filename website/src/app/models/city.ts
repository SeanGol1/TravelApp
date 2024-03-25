import { Country } from "./country";
import { ToDo } from "./todo";

export interface City {
    id:number;
    name : string;
    country : Country;
    toDos: ToDo[];
}