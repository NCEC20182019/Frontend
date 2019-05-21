import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // private _usersUri = 'http://localhost:9999/auth'; // - Local
  private _usersUri = '/auth'; // - Prod

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private returnUrl;

  constructor(
    private http: HttpClient,
    public cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  addAuthHeader(headers: HttpHeaders){
    const token = this.cookieService.get('token');
    if (token) {
      //console.log('token', token);
      return headers.set('Authorization', 'Bearer ' + token);
    }
  }


  login(username: string, password: string): any {
    return this.http.post<any>('/signin', { username, password })
  }
      // .pipe(map(token => {
        // console.log(token);
        // user.token = token;
        // login successful if there's a jwt token in the response
        // if (user && user.token) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   this.currentUserSubject.next(user);
        // }

      // }));

  logout() {
    // remove user from local storage to log user out
    this.cookieService.delete("token");
    this.cookieService.delete("refresh");
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(["./app/login"]);
  }

  refreshTokens() {
    //TODO
  }

  setCurrentUser(user: User, token: string, refresh: string) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.cookieService.set("token", token);
    this.cookieService.set("refresh", refresh);
  }
}
