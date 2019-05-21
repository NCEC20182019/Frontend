import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { MapOverlayService } from 'src/app/services/map.overlay';
import { Overlay } from '@angular/cdk/overlay';
import { MapComponent } from '../map/map.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SubscriptionService} from "../../services/subscription.service";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  @ViewChild('main') mainDiv : HTMLDivElement;

  public currentEvent: IEvent;
  private edit: boolean = false;
  private form: FormGroup;
  subscribed = false;



  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private overlay: Overlay,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private subService: SubscriptionService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
        this.getCurrentEvent(parseInt(params.get('id')));
    });
  }

  initForm(){
    this.form = this.fb.group({
      id: [this.currentEvent.id],
      title: [this.currentEvent.title, Validators.required],
      description: [this.currentEvent.description, Validators.required],
      date_start: [this.currentEvent.date_start, Validators.required],
      date_end: [this.currentEvent.date_end, Validators.required],
      source_uri: [typeof this.currentEvent.source_uri === 'string' ? this.currentEvent.source_uri : '', Validators.required],
      type: [this.currentEvent.type, Validators.required],
      name_location: [this.currentEvent.location.name, Validators.required]
    });
  }
  getCurrentEvent(_id){
    this.dataService.getEvent(_id)
      .subscribe((event) => {
        this.currentEvent = event;
        this.initForm();
        this.subService.isSubscribed(this.currentEvent.id, this.authService.currentUserValue.id)
          .subscribe(
            (data) => this.subscribed = data
          );
      });
  }

  onMarkerPlaced($event) {

  }

  passEventToMap() {

  }

  close() {

  }

  save() {

  }

  delete() {

  }

  dateFormatInner(str_date: String) {
    let [date, time] = str_date.split('T');
    let [hrs, mins] = time.split(':');
    return date.split('-').reverse().join('/') + " " + hrs + ':' + mins;
  }

  dateFormat(str_date1: String, str_date2: String){
    if (str_date1 && str_date2) {
      let [date1, time1] = this.dateFormatInner(str_date1).split(' ');
      let [date2, time2] = this.dateFormatInner(str_date2).split(' ');
      return date1 === date2 ? `${date1} c ${time1} по ${time2}` : `c ${date1}, ${time1} по ${date2}, ${time2}`;
    } else {
      return '<i>время отсутсвует</i>';
    }
  }

  getCurrentList() {
    return [this.currentEvent];
  }

  canEdit(){
    let head = false;
    this.authService.currentUserValue.roles.forEach((x) => {
      head = head || (x.name === "ROLE_moderator" || x.name === "ROLE_admin");
    });
    return this.authService.currentUserValue.id === this.currentEvent.owner_id || head;

  }

  subscribeToEvent() {
    this.subService.addSubscription({
      eventId: this.currentEvent.id,
      name: this.currentEvent.title,
      enabled: true,
      userId: this.authService.currentUserValue.id
    }).subscribe( ()=>{},()=>{},() => this.subscribed = true);
  }
  unsubscribe(){
    this.subService.deleteEventSubscription(this.currentEvent.id, this.authService.currentUserValue.id)
      .subscribe(()=>{}, ()=>{}, ()=> this.subscribed = false);
  }
}
