import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {SubscriptionService} from '../../services/subscription.service';
import {UpdateService} from '../../services/update.service';
import {Update} from "../../models/update";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  @ViewChild('main') mainDiv : HTMLDivElement;

  public currentEvent: IEvent;
  liveActions: any[];
  subscribed = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: Overlay,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private subService: SubscriptionService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.getCurrentEvent(parseInt(params.get('id')));
      // this.currentEvent = this.dataService.getMockEvents()[0];
    });
  }

  getCurrentEvent(_id){
    this.dataService.getEvent(_id)
      .subscribe((event) => {
        this.currentEvent = event;
        if(this.authService.currentUserValue) {
          this.subService.isSubscribed(this.currentEvent.id, this.authService.currentUserValue.id)
            .subscribe(
              (data) => this.subscribed = data
            );
        }
        this.updateService.getUpdates(this.currentEvent.id)
          .subscribe((actions: Update[]) => {
            this.liveActions = actions;
            console.log(this.liveActions);
          })
      });
  }

  static dateFormatInner(str_date: String) {
    let [date, time] = str_date.split('T');
    let [hrs, mins] = time.split(':');
    return date.split('-').reverse().join('/') + " " + hrs + ':' + mins;
  }

  dateFormat(str_date1: String, str_date2: String){
    if (str_date1 && str_date2) {
      let [date1, time1] = EventViewComponent.dateFormatInner(str_date1).split(' ');
      let [date2, time2] = EventViewComponent.dateFormatInner(str_date2).split(' ');
      return date1 === date2 ? `${date1} c ${time1} по ${time2}` : `c ${date1}, ${time1} по ${date2}, ${time2}`;
    } else {
      return 'время отсутсвует';
    }
  }

  getCurrentList() {
    return [this.currentEvent];
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

  editRedirect() {
    this.router.navigate(['app/events/'+ this.currentEvent.id.toString() + '/edit']);
  }

  canEdit(owner_id){
    if(!!this.authService.currentUserValue) {
      let head = false;
      this.authService.currentUserValue.roles.forEach((x) => {
        head = head || x.name === "ROLE_moderator" || x.name === "ROLE_admin";
      });
      // console.log(owner_id);
      // console.log(this.authService.currentUserValue.id);
      // console.log(this.authService.currentUserValue.id == owner_id);
      head = head || this.authService.currentUserValue.id == owner_id;
      return head;
    }else{
      return false;
    }
  }

  redirectToTweet(url_to_tweet: string) {
    window.location.href = url_to_tweet;
  }
}
