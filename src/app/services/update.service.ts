import { Injectable } from '@angular/core';
import {IEvent} from "../models/ievent";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private _updatesUri = '/updates';
  private _usersUri = '/auth';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient) {
  }

  getUpdates(event_id){
    return this.http.get(this._updatesUri + "/by_event", {
      params: {'id': event_id},
      headers: this.headers
    });
  }
}
