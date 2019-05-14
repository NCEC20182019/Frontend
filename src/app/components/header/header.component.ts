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

  private Title = 'Lemmeknow';
  private navLinks = [{relativePath: 'map', label: 'Map View'},
                      {relativePath: 'calendar', label: 'Calendar View'}];

  emptyEvent: IEvent = {
    owner_id: null,
    title: '',
    description: '',
    date_end: moment().format('YYYY-MM-DDTkk:mm'),
    date_start: moment().format('YYYY-MM-DDTkk:mm'),
    type: '',
    source_uri: '',
    location: { id: null, name: '', lng: 0, ltd: 0},
    pic: '',
    id: 0
  };

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
