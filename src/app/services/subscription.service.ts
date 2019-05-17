import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private notificationUri = '/notifications';

  private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }


  getSubscriptions(userId): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.notificationUri + '/subscriptions/' + userId, {headers: this.authService.addAuthHeader(this.headers)});
  }
  /** POST: subscribe to event */
  addSubscription(subs) {
    return this.http.post(this.notificationUri + '/subscribe', subs, {headers: this.authService.addAuthHeader(this.headers)});
  }

  /** POST: unsubscribe user from event  */
  deleteSubscription(subId: any) {
    return this.http.delete(this.notificationUri + /unsubscribe/ + subId, {headers: this.authService.addAuthHeader(this.headers)});
  }

  subscribeOrUpdate(subs: any[]) {
    return this.http.post(this.notificationUri + '/subscribe-or-update', subs, {headers: this.authService.addAuthHeader(this.headers)});
  }
}
