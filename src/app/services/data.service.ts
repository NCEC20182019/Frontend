import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, from, BehaviorSubject} from 'rxjs';
import { IEvent } from '../models/ievent';
import { User } from '../models/user';
import {AuthenticationService} from "./authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public Events: IEvent[];

  private headers = new HttpHeaders({
                                               'Content-Type': 'application/json',
                                               'Access-Control-Allow-Origin': '*',
                                               'Authorization': 'Bearer ' + this.authService.cookieService ? this.authService.cookieService.get('token') : ' '
                                             });
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient) {
  }

  getEvents(sort: number, filter){
    this.Events = [];
    this.httpGetEvents(sort, filter);
    return this.Events;
  }

  addLocalEvents(events){
    this.Events.concat(events);
    console.log('Все ивенты', this.Events);
  }

  private _eventsUri = '/events'; // -- Integration URL
  private _usersUri = '/auth';
  // private _usersUri = 'http://localhost:9999/auth';

  httpGetEvents(sort: number, filter) {
    this.http.post<IEvent[]>(this._eventsUri, {sort, filter},
      {headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })}
      ).subscribe((data)=>{
          this.addLocalEvents(data);
        },
      (error) => {
        console.log(error);
        this.httpGetAllEvents();
      });
  }

  getMockEvents(): IEvent[]{
    return [
      {
        owner_id: 1,
        id: 1,
        title: "Фестиваль волшебных шаров — Воронеж",
        description: "Настоящее волшебство окутает стадион «Динамо» 1 июня: в этот вечер здесь пройдет сказочный фестиваль, на котором сотни волшебных шаров в руках гостей в один миг засияют разноцветными огоньками, создав вокруг особую завораживающую атмосферу.\n\nКроме волшебных шаров с заходом солнца жителей города ждет захватывающее световое представление и выступление музыкальных виртуозов с чарующими композициями.\n\nКстати, волшебные шары по окончании фестиваля зрители смогут забрать с собой: они будут озарять светом дом, еще долго напоминая о чудесном событии. \n\nНачало в 21:00.\n\nСтоимость входа: 100₽ (волшебные шары приобретаются на территории фестиваля).",
        date_start: "2019-06-01T18:00:00.000+0000",
        date_end: "2019-06-01T19:30:00.000+0000",
        source_uri: "https://vk.com/event65334589",
        type: "Другое",
        pic: '',
        location: {
          id: 15,
          name: "Фестиваль волшебных шаров — Воронеж",
          latitude: 51.63344192504883,
          longitude: 39.2305793762207,
        }
      },
      {
        owner_id: 4,
        id: 2,
        title: "title2",
        type: "String",
        source_uri: 'http://www.site2.com',
        description: "String",
        date_start: "0.0.0",
        date_end: "1.1.1",
        pic: "",
        location: {
          id: 1,
          name: 'loc2',
          latitude: 52.6000000,
          longitude: 37.7000000
        }
      },
      {
        owner_id: null,
        id: 3,
        title: "title3",
        type: "String",
        source_uri: 'http://www.site3.com',
        description: "String",
        date_start: "0.0.0",
        date_end: "1.1.1",
        pic: "",
        location: {
          id: 2,
          name: 'loc3',
          latitude: 100,
          longitude: 100
        }
      },
    ];
  }

  getEvent(_id): IEvent {
    if(!this.Events.length){
      this.Events = this.getMockEvents(); //TODO
    }
    let event = this.Events.find((x) => x.id === _id);
    if(!event) {
      this.http.get<IEvent>(this._eventsUri + '/' + _id,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
        }).subscribe((data) =>{
          return data;
      });
    }else {
      return event;
    }
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
    return this.http.put(this._eventsUri + '/update/' + id, event,
      {
        headers: this.headers
      });
  }
  /** POST: add a new event to eventService */
  addEvent(event) {
    return this.http.post(this._eventsUri + '/create', event,
      {
        headers: this.headers
      });
  }

  /** DELETE: delete event from eventService */
  deleteEvent(_id) {
    return this.http.delete(this._eventsUri + '/delete/' + _id,
      {
        headers: this.headers
      });
  }

  registerUser(user: User){
    return this.http.put(this._usersUri + '/user/put', user,
    {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })});
  }

  private httpGetAllEvents() {
    this.http.get<IEvent[]>(this._eventsUri,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }).subscribe((data)=>{
        this.addLocalEvents(data);
      },
      (error) => {
        console.log(error);
      })
  }
}
