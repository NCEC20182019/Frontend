import {Component, OnInit, ViewChild} from '@angular/core';
import {IEvent} from "../../models/ievent";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SubscriptionService} from "../../services/subscription.service";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  @ViewChild('map') myMap;

  currentEvent: IEvent;
  form: FormGroup;
  subscribed = false;

  typeList: any[];
  marker;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private subService: SubscriptionService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadTypeList();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getCurrentEvent(parseInt(params.get('id')));
      // this.currentEvent = this.dataService.getMockEvents()[0];
      });
      }

  loadTypeList() {
    this.dataService.getTypes().subscribe(
      data => this.typeList = data
    );
  }

  initForm(){
    this.form = this.fb.group({
      id: [this.currentEvent.id],
      title: [this.currentEvent.title, [ Validators.required]],
      description: [this.currentEvent.description],
      date_start: [new Date(this.currentEvent.date_start), [ Validators.required]],
      date_end: [new Date(this.currentEvent.date_end), [ Validators.required]],
      source_uri: [typeof this.currentEvent.source_uri === 'string' ? this.currentEvent.source_uri : ''],
      type: [this.currentEvent.type, [ Validators.required]],
      name_location: [this.currentEvent.location.name, [ Validators.required]]
    });
  }

  getCurrentEvent(_id){
    this.dataService.getEvent(_id)
      .subscribe((event) => {
        this.currentEvent = event;
        console.log(this.currentEvent.date_start);
        this.marker = {latitude: this.currentEvent.location.latitude,
          longitude: this.currentEvent.location.longitude};
        this.initForm();
        this.subService.isSubscribed(this.currentEvent.id, this.authService.currentUserValue.id)
          .subscribe(
            (data) => this.subscribed = data
          );
      });
  }

  get f() {
    return this.form.controls;
  }

  canEdit(owner_id: number): boolean{
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

  goBack() {
    this.location.back();
  }

  save() {
    console.log(this.f.date_start.value);
    let savingEvent: IEvent = {
      id: this.currentEvent.id,
      owner_id: this.currentEvent.owner_id,
      title: this.f.title.value ? this.f.title.value : this.currentEvent.title,
      type: this.f.type.value ? this.f.type.value : this.currentEvent.type,
      source_uri: this.f.source_uri.value ? this.f.source_uri.value : this.currentEvent.source_uri,
      description: this.f.description.value ? this.f.description.value : this.currentEvent.description,
      date_end: this.f.date_end.value ? this.f.date_end.value : this.currentEvent.date_end,
      date_start: this.f.date_start.value ? this.f.date_start.value : this.currentEvent.date_start,
      image_url: this.currentEvent.image_url,
      location: {
        id: null,
        latitude: this.marker.latitude,
        longitude: this.marker.longitude,
        name: this.f.name_location.value
      }
    };
    console.log(savingEvent);
    this.dataService.updateEvent(savingEvent, savingEvent.id);
    this.router.navigate(['..'], { relativeTo: this.route });
    this.snackBar.open('Successfully updated', 'Close', {duration: 3000})
  }

  onMarkerPlaced(coords) {
    this.marker.latitude = coords.latitude;
    this.marker.longitude = coords.longitude;
    console.log(this.myMap.Events);
    if(this.myMap.Events)
      this.myMap.Events = [];
  }

  delete() {
    this.dataService.deleteEvent(this.currentEvent.id);
    this.router.navigate(['/']);
    this.snackBar.open('Successfully deleted', 'Close', {duration: 3000});
  }
}
