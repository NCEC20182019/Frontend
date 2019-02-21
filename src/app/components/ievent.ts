import { Url } from "url";
import { ILocation } from "./ilocation";

export interface IEvent{
    id: Number;
    title: String;
    type: String;
    source_uri: Url;
    description: String;
    location: ILocation;
    date_start: String;
    date_end: String;
    pic: String;
}

export class Events{
    public Events: IEvent[] = [];
}

export class Event{
    id: Number;
    title: String;
    type: String;
    source_uri: Url;
    description: String;
    location: ILocation;
    date_start: String;
    date_end: String;
    pic: String;
}