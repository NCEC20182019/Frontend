import { Url } from "url";

export interface IEvent{
    id: Number,
    name: String,
    type: String,
    link: Url,
    description: String,
    lng: Number,
    ltd: Number,
    start_date: String,
    end_date: String,
    pic: String
}