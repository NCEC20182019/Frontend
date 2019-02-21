import { Injectable } from '@angular/core';
import { IEvent, Event } from "../components/IEvent";
import { Store } from 'rxjs-observable-store';


@Injectable({
    providedIn: 'root'
  })
export class EventsStore extends Store<Event> {
  constructor () {
    super(new Event());
  }

  addEvent(event: Event){
      
  }

}