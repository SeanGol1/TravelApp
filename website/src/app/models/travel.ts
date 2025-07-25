import { City } from "./city";


export interface Travel {
    id:number;
    travelType:TravelType;
    date: Date;
    fromCity : City;
    toCity: City; //TODO: Remove 
}

export enum TravelType {
    Flight=0,
    Bus=1,
    Train=2,
    Boat=3,
    Scooter=4,
    Walk=5,
    Taxi=6
}
