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
    return this.http.post(this.notificationUri + '/subscribe', subs, {headers: this.authService.addAuthHeader(this.headers)})
      .subscribe();
  }

  /** POST: unsubscribe user from event, type or area by subId  */
  deleteSubscription(subId: any) {
    return this.http.delete(this.notificationUri + '/unsubscribe/' + subId, {headers: this.authService.addAuthHeader(this.headers)});
  }
  /** POST: unsubscribe user from event by eventId and userId  */
  deleteEventSubscription(eventId, userId) {
    return this.http.delete(this.notificationUri + '/unsubscribe/' + userId + '/' + eventId, {headers: this.authService.addAuthHeader(this.headers)})
      .subscribe();
  }

  subscribeOrUpdate(subs: any[]) {
    return this.http.post(this.notificationUri + '/subscribe-or-update', subs, {headers: this.authService.addAuthHeader(this.headers)});
  }

  isSubscribed(eventId, userId) {
    return this.http.get<boolean>(this.notificationUri + '/check/' + userId + '/' + eventId, {headers: this.authService.addAuthHeader(this.headers)});
  }
}
