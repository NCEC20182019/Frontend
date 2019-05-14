import { Component, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, of, from } from 'rxjs';
import { ILocation } from '../../models/ilocation';
import { IEvent } from '../../models/ievent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlHandlingStrategy } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-event-create-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.scss']
})
export class EventCreateDialogComponent implements OnInit {

  form: FormGroup;

  curCoords: ILocation = {
    id: null,
    name: '',
    lng: 0,
    ltd: 0
  };
  emptyEvent: IEvent = {
    title: '',
    description: '',
    date_end: moment().format('YYYY-MM-DDTkk:mm'),
    date_start: moment().format('YYYY-MM-DDTkk:mm'),
    type: '',
    source_uri: '',
    location: { id: null, name: '', lng: 0, ltd: 0 },
    pic: '',
    id: 0,
    owner_id: 0
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventCreateDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: IEvent) {

    this.form = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      date_start: [data.date_start, Validators.required],
      date_end: [data.date_end, Validators.required],
      source_uri: [typeof data.source_uri === 'string' ? this.data.source_uri : '', Validators.required],
      type: [data.type, Validators.required],
      name_location: [data.location.name, Validators.required]
    });
  }

  ngOnInit() {

  }

  save() {
    const dataToPass: IEvent = this.form.value;

    dataToPass.location = {
      id: null,
      name: this.form.value.name_location,
      lng: this.curCoords.lng,
      ltd: this.curCoords.ltd
    };

    this.dialogRef.close(dataToPass);
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(this.data.id);
  }

  onMarkerPlaced(location: ILocation) {
    console.log('onMarkerPlaced ', location);
    this.curCoords = location;
  }


  passEventToMap() {
    const n: IEvent[] = [];
    // if data
    n.push(this.data ? this.data : this.emptyEvent);
    return of(n);
  }

}
