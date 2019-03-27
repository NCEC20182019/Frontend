import { Component, OnInit, OnDestroy, Output, Input, Optional } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ILocation } from '../ilocation';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EventDetailDialogComponent } from '../event-detail-dialog/event-detail-dialog.component';
import { IEvent } from '../ievent';
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() event: IEvent;
  // sub:Subscription;
  eventObs: Observable<any> = new Observable();
  // name_location:string;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit() {
    if (this.event) {
      this.event.date_start = moment(this.event.date_start.toString()).format('YYYY-MM-DDTkk:mm');
      this.event.date_end = moment(this.event.date_end.toString()).format('YYYY-MM-DDTkk:mm');
    }
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  save() {
    let eventToSend = {};
    if (this.event && this.event.location) {
      eventToSend = {
        title: this.event.title,
        description: this.event.description,
        date_start: this.event.date_start,
        date_end: this.event.date_end,
        source_uri: this.event.source_uri,
        type: this.event.type,
        latitude: this.event.location.ltd,
        longitude: this.event.location.lng,
        name_location: this.event.location.name
      };
      if (this.event.id) {
        // console.log('update: ', this.event);
        this.dataService.updateEvent(eventToSend, this.event.id).subscribe();
      } else {
        // console.log('save: ', this.event);
        this.dataService.addEvent(eventToSend).subscribe();
      }
    }
  }
  delete(id: number) {
    this.dataService.deleteEvent(id).subscribe();
  }

  openDialog(): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.data = this.event;

    const dialogRef = this.dialog.open(EventDetailDialogComponent, dialogConf);

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'number') {
        this.delete(result);
      } else if (result) {
        this.event = result;
        this.event.location = result.location;
        // console.log(this.event);
        this.save();
      }
    });
  }
}
