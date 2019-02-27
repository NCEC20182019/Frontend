import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../components/IEvent';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _eventsUri = "http://localhost:8092/event/"; // -- Integration URL
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
    return this.http.get<IEvent>(this._eventsUri+"/"+_id, 
    { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*' 
    })});
  }

  getRandomPic(): Observable<any>{
    return this.http.get<any>("https://picsum.photos/200/300/?random",   //Put the url in
    { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*' 
  })});
  }
}
