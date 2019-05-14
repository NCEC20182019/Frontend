import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  private notificationUri = '/notifications';
  private eventUri = '/events';

  private headers = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    })
  };

  getSubscriptions(userId): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.notificationUri + '/subscriptions/' + userId, this.headers);
  }
  /** POST: subscribe to event */
  addSubscription(subs) {
    return this.http.post(this.notificationUri + '/subscribe', subs, this.headers);
  }

  /** POST: unsubscribe user from event  */
  deleteSubscription(subId: any) {
    return this.http.delete(this.notificationUri + /unsubscribe/ + subId, this.headers);
  }

  getTypes() {
    return this.http.get<{id: number, type: string}[]>(this.eventUri + '/types', this.headers);
  }

  subscribeOrUpdate(subs: any[]) {
    return this.http.post(this.notificationUri + '/subscribe-or-update', subs, this.headers);
  }
}
