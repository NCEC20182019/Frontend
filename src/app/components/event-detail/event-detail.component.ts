import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ILocation } from '../ilocation';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EventDetailDialogComponent } from '../event-detail-dialog/event-detail-dialog.component';
import { IEvent } from '../ievent';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit, OnDestroy {

  @Input() title: string;
  event:IEvent;
  sub:Subscription;
  eventObs: Observable<any> = new Observable();
  //name_location:string;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private dataService: DataService) { }

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

  save(){
    let eventToSend = {}
    console.log('save ',this.event);
    if(this.event && this.event.location) {
      eventToSend = {
        title: this.event.title,
        description: this.event.description,
        date_start: this.event.date_start,
        date_end: this. event.date_end,
        source_uri: this.event.source_uri,
        type: this.event.type,
        name_location: this.event.location.name
       };
      if(this.event.id)
        this.dataService.updateEvent(eventToSend,this.event.id);
      else
        this.dataService.addEvent(eventToSend).subscribe();
    }
  }

  openDialog(): void {
    let dialogConf=new MatDialogConfig();
    dialogConf.disableClose=true;
    dialogConf.autoFocus=true;
    dialogConf.data=this.event?this.event: {location: {}};

    const dialogRef = this.dialog.open(EventDetailDialogComponent, dialogConf);

    dialogRef.afterClosed().subscribe(result => {
      this.event = result;
      this.event.location = result.location;
      console.log(this.event);
      this.save();
    });
  }
}
