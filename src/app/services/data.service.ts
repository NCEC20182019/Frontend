import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { IEvent } from '../models/ievent';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private _eventsUri = 'http://192.168.1.7:8092/event/'; // -- Integration URL
  private _eventsUri = 'http://localhost:8092/event/'; // -- Integration URL
  // private _eventsUri = "https://7678acb1-b897-4f74-a317-63ae18c493fe.mock.pstmn.io/events"; // -- Mock server
  private _userService = 'http://localhost:9999/auth';

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

  getMockEvents(): Observable<IEvent[]>{
    return of([
      {
        id: 1,
        title: "title1",
        type: "String",
        source_uri: 'http://www.site1.com',
        description: "String",
        date_start: "0.0.0",
        date_end: "1.1.1",
        pic: "",
        location: {
          name: 'loc1',
          ltd: 0,
          lng: 0
        }
      },
      {
        id: 2,
        title: "title2",
        type: "String",
        source_uri: 'http://www.site2.com',
        description: "String",
        date_start: "0.0.0",
        date_end: "1.1.1",
        pic: "",
        location: {
          name: 'loc2',
          ltd: 10,
          lng: 10
        }
      },
      {
        id: 3,
        title: "title3",
        type: "String",
        source_uri: 'http://www.site3.com',
        description: "String",
        date_start: "0.0.0",
        date_end: "1.1.1",
        pic: "",
        location: {
          name: 'loc3',
          ltd: 100,
          lng: 100
        }
      },
    ]);
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

  registerUser(user: User){
    return this.http.put('http://localhost:9999/auth/user/put', user, 
    {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })});
  }
}
