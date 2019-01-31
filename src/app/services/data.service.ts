import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../components/IEvent';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private _eventsUri = "/assets/events.json";
  private _eventsUri = "https://7678acb1-b897-4f74-a317-63ae18c493fe.mock.pstmn.io/events";

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]>{
    return this.http.get<IEvent[]>(this._eventsUri);
  }
}
