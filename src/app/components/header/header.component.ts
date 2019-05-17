import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { IEvent } from '../../models/ievent';
import * as moment from 'moment';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private Title = 'LemmeKnow';
  private navLinks = [{relativePath: 'map', label: 'Map View'},
                      {relativePath: 'calendar', label: 'Calendar View'}];


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
}
