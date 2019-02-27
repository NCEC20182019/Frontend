import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ILocation } from '../ilocation';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit, OnDestroy {

  event:any = {};
  sub:Subscription;
  formCoords: ILocation;
  eventObs: Observable<any> = new Observable();
  name_location:string;

  constructor(private route: ActivatedRoute,
    private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.eventObs = this.dataService.getEvent(id);
        this.eventObs.subscribe((event: any) => {
          if (event) {
            this.event = event;
          } else {
            console.log(`Event with id '${id}' not found!`);
          }
        });
      }
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getEvent(){
    return this.eventObs;
  }

  save(){
    let eventToSend = {
      title: this.event.title,
      description: this.event.description,
      date_start: this.event.date_start,
      date_end: this. event.date_end,
      source_uri: this.event.source_url,
      type: this.event.type,
      name_location: this.name_location
     };
    if(this.event.id)
      this.dataService.updateEvent(eventToSend,this.event.id);
    else
      this.dataService.addEvent(eventToSend).subscribe();
  }

  onMarkerPlaced(event: ILocation){
    this.formCoords=event;
  }

}
