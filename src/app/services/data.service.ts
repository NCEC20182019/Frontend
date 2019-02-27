import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/Operators';
import { IEvent } from '../components/ievent';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _eventsUri = "http://localhost:8080/event/"; // -- Integration URL
  // private _eventsUri = "https://7678acb1-b897-4f74-a317-63ae18c493fe.mock.pstmn.io/events"; // -- Mock server

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]>{
    return this.http.get<IEvent[]>(this._eventsUri, 
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*' 
      })});
    }

  getEvent(_id): Observable<IEvent>{
    return this.http.get<IEvent>(this._eventsUri+_id, 
    { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*' 
    })});
  }

  /** PUT: update the event on eventService */
  updateEvent (event,id) {
    return this.http.put(this._eventsUri+'update/'+id, event,
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*' 
    })});
  }
  /** POST: add a new event to eventService */
  addEvent (event) {
    return this.http.post(this._eventsUri+"create", event, 
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*' 
    })});
  }

  /** DELETE: delete event from eventService */
  deleteEvent (_id) {
    return this.http.delete(this._eventsUri+'delete/'+_id);
  }
}
