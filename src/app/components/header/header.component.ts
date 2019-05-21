import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { IEvent } from '../../models/ievent';
import * as moment from 'moment';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public Title = 'LemmeKnow';

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  @Input() public currentRoute: ActivatedRoute;

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['./login']);
  }

  redirectHome() {
    this.router.navigate(['']);
  }

  loggedIn(){
    return this.authService.currentUserValue;
  }

  user(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  redirectUser() {
    this.router.navigate(['/app/me']);
  }
}
