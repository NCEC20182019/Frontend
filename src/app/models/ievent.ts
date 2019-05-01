import { Url } from "url";
import { ILocation } from "./ilocation";

export interface IEvent{
    id: Number;
    title: String;
    type: String;
    source_uri: String;
    description: String;
    location: ILocation;
    date_start: String;
    date_end: String;
    pic: String;
}