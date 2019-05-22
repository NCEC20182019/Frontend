import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {IEvent} from '../models/ievent';
import {User} from '../models/user';
import {AuthenticationService} from "./authentication.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _eventsUri = '/events';
  private _usersUri = '/auth';
  public Events: IEvent[];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  // Observable navItem source
  private _eventSource = new Subject<IEvent[]>();
  // Observable navItem stream
  eventList$ = this._eventSource.asObservable();

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.Events = [];
  }

  getAllEvents() {
    this.http.get<IEvent[]>(this._eventsUri, {headers: this.headers})
      .subscribe((data) => {
          this._eventSource.next(data);
        },
        (error) => {
          //console.log(error);
        });
  }
  getSortedEvents(sort: number, filter) {
    this.http.post<IEvent[]>(this._eventsUri + '/sort', {sort, filter},{headers: this.authService.addAuthHeader(this.headers)})
      .subscribe(
        (data) => this._eventSource.next(data),
        (error) => {
          this.getAllEvents();
          //console.log(error);
        }
      );
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
        image_url: '',
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
        image_url: "",
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
        image_url: "",
        location: {
          id: 2,
          name: 'loc3',
          latitude: 100,
          longitude: 100
        }
      },
    ];
  }

  getEvent(_id) {
    return this.http.get<IEvent>(this._eventsUri + '/' + _id,{ headers: this.headers });
  }

  /** PUT: update the event on eventService */
  updateEvent(event, id) {
    const ar = [];
    return this.http.put(this._eventsUri + '/update/' + id, this.convertEventToDTO(event), { headers: this.authService.addAuthHeader(this.headers) })
      .subscribe( (event) => {
        ar.push(event);
        this._eventSource.next(ar);
      });
  }

  /** POST: add a new event to eventService */
  addEvent(event) {
    const ar = [];
    this.http.post<IEvent>(this._eventsUri + '/create', this.convertEventToDTO(event),
      {headers: this.authService.addAuthHeader(this.headers)})
      .subscribe( (event) => {
        ar.push(event);
        this._eventSource.next(ar);
      });
  }

  /** DELETE: delete event from eventService */
  deleteEvent(_id) {
    return this.http.delete(this._eventsUri + '/delete/' + _id, {headers: this.authService.addAuthHeader(this.headers)}).subscribe();
  }

  registerUser(user: User) {
    return this.http.put(this._usersUri + '/user/put', user, {headers: this.headers});
  }

  /** Retrive all available event types from eventDB*/
  getTypes() {
    return this.http.get<{id: number, type: string}[]>(this._eventsUri + '/types', {headers: this.authService.addAuthHeader(this.headers)});
  }

  convertEventToDTO(event: IEvent) {
    return {
      owner_id: event.owner_id,
      title: event.title,
      description: event.description,
      date_start: event.date_start,
      date_end: event.date_end,
      source_uri: event.source_uri,
      image_url: event.image_url,
      type: event.type,
      name_location: event.location.name,
      latitude: event.location.latitude,
      longitude: event.location.longitude
    }
  }
}
