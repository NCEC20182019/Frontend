import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  private notificationUri = 'http://localhost:8093/notifications';
  private eventUri = 'http://localhost:8092/events';

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

  /** POST: disable subscriptions */
  toggleSubscriptions(toggles) {
    this.http.post(this.notificationUri + '/toggle', toggles, this.headers).subscribe();
  }
  /** POST: unsubscribe user from events  */
  deleteSubscriptions(ids) {
    this.http.post(this.notificationUri + '/unsubscribe', ids, this.headers).subscribe();
  }
  /** POST: unsubscribe user from event  */
  deleteSubscription(subId: any) {
    return this.http.delete(this.notificationUri + /unsubscribe/ + subId, this.headers);
  }

  updateAreas(areaSubs: Subscription[]) {
    this.http.post(this.notificationUri + '/update/areas', areaSubs, this.headers).subscribe();
  }

  getTypes() {
    return this.http.get<{id: number, type: string}[]>(this.eventUri + '/types', this.headers);
  }
}
