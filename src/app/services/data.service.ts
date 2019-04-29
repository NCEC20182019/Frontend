import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IEvent } from '../components/ievent';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private _eventsUri = 'http://192.168.1.7:8092/event/'; // -- Integration URL
  private _eventsUri = '/event/'; // -- Integration URL
  // private _eventsUri = "https://7678acb1-b897-4f74-a317-63ae18c493fe.mock.pstmn.io/events"; // -- Mock server
  private _userService = 'http://localhost:8090/signin';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this._eventsUri,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      });
  }

  getEvent(_id): Observable<IEvent> {
    return this.http.get<IEvent>(this._eventsUri + _id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      });
  }

  getRandomPic(): Observable<any> {
    return this.http.get<any>('https://picsum.photos/200/300/?random',   // Put the url in
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      });
  }

  /** PUT: update the event on eventService */
  updateEvent(event, id) {
    return this.http.put(this._eventsUri + 'update/' + id, event,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      });
  }
  /** POST: add a new event to eventService */
  addEvent(event) {
    return this.http.post(this._eventsUri + 'create', event,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      });
  }

  /** DELETE: delete event from eventService */
  deleteEvent(_id) {
    return this.http.delete(this._eventsUri + 'delete/' + _id);
  }

  loginUser(credentials){
    return this.http.post(this._userService, credentials);
  }
}
