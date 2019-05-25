import { ILocation } from "./ilocation";

export interface IEvent{
    id: Number;
    owner_id: Number;
    title: String;
    type: String;
    source_uri: String;
    description: String;
    location: ILocation;
    date_start: string;
    date_end: string;
    image_url: String;
}
