import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {IEvent} from '../../models/ievent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DataService} from "../../services/data.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-event-create-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.scss']
})
export class EventCreateDialogComponent implements OnInit {

  form: FormGroup;
  typeList: any[];

  newEvent: IEvent = {
    title: '',
    description: '',
    date_end: moment().format('YYYY-MM-DDTkk:mm'),
    date_start: moment().format('YYYY-MM-DDTkk:mm'),
    type: '',
    source_uri: '',
    location: { id: null, name: '', longitude: 0, latitude: 0 },
    image_url: '',
    id: 0,
    owner_id: 0
  };

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EventCreateDialogComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.typeList = [];
  }

  ngOnInit() {
    this.loadTypeList();
    this.form = this.fb.group({
      title: this.newEvent.title,
      description: [this.newEvent.description],
      date_start: [this.newEvent.date_start, Validators.required],
      date_end: [this.newEvent.date_end, Validators.required],
      source_uri: [this.newEvent.source_uri],
      type: [Validators.required],
      name_location: [this.newEvent.location.name, Validators.required]
    });
  }
  loadTypeList() {
    this.dataService.getTypes().subscribe(
      data => this.typeList = data
    );
  }

  openSnackBar(message: any, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  save() {
    // console.log(this.form.value);
    this.newEvent.title = this.form.value.title;
    this.newEvent.description = this.form.value.description;
    this.newEvent.date_start = this.form.value.date_start;
    this.newEvent.date_end = this.form.value.date_end;
    this.newEvent.source_uri = this.form.value.source_uri;
    this.newEvent.type = this.form.value.type;
    this.newEvent.location.name = this.form.value.name_location;
    this.newEvent.owner_id = this.authService.currentUserValue.id;

    if (this.newEvent.location.longitude && this.newEvent.location.latitude) {
      this.dataService.addEvent(this.newEvent);
      this.close();
    } else {
      this.openSnackBar('Set the location of the event on the map!');
      return;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onMarkerPlaced(coords) {
    this.newEvent.location.latitude = coords.latitude;
    this.newEvent.location.longitude = coords.longitude;
  }

}
