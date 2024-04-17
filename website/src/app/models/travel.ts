import { City } from "./city";


export interface Travel {
    id:number;
    travelType:TravelType;
    date: Date;
    fromCity : City;
    toCity: City;
}

export enum TravelType {
    Flight=0,
    Bus=1,
    Train=2,
    Boat=3,
    Scooter,
    Walk,
    Taxi
}
