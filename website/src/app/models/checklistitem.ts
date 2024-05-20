import { Country } from "./country";

export interface ChecklistItem {
    id:number;
    name : string;
    country : Country;
    countryId:number;
    completed:boolean
}

export interface ChecklistItemDialogData {
    countryId: number;
    name: string;
  }

  export interface UpdateChecklistItemDialogData {
    id: number;
    name: string;
    countryId: number;
    completed:Boolean;
  }