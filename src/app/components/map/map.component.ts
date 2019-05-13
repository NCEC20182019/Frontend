import {Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../../models/ilocation';
import { IEvent } from '../../models/ievent';
import {AgmCircle} from "@agm/core";
import {Subscription} from "../../models/subscription";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() Events: IEvent[];
  @Input() filter: boolean;
  @Input() areas: Subscription[];
  @Output() markerPlaced: EventEmitter<ILocation> = new EventEmitter();
  @Output() areaChange: EventEmitter<Subscription[]> = new EventEmitter();

  userLocation: ILocation = {
    name: '',
    ltd: 0,
    lng: 0
  };

  private userMarker = {
    url: '../../../assets/blue-marker.png',
  };

  private currentMarker: ILocation;

  private zoom = 12;


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.Events) {
      this.Events.forEach(event => {
          event.pic = 'https://picsum.photos/50/50/?random';
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.ltd = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;
      });
    }
  }

  onChooseLocation(event) {
    this.currentMarker =  { ltd: event.coords.lat,
                            lng: event.coords.lng,
                            name: '' };

    this.markerPlaced.emit(this.currentMarker);
    // console.log(this.currentMarker)
    // console.log(this.circle);
  }

  onCreateArea($event) {
    this.areas.push({
      id: null,
      userId: null,
      eventId: null,
      type: null,
      radius: 1,
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      enabled: true,
      name: null
    });

  }

  // onCircleChangeRadius(arId, $event) {
  //   // const index = this.emitAreas.findIndex(a => a.arId === arId);
  //   // if (index >= 0) {
  //   //   this.emitAreas[index].radius = typeof $event === 'number' ? $event: null;
  //   // } else {
  //   //   this.emitAreas.push({
  //   //     arId: arId,
  //   //     ltd: null,
  //   //     lng: null,
  //   //     radius: typeof $event === 'number' ? $event: null
  //   //   });
  //   // }
  //
  //   const r = typeof $event === 'number' ? $event : null;
  //   this.areaChange.emit({
  //     arId: arId,
  //     ltd: null,
  //     lng: null,
  //     radius: r
  //   });
  // }
  // onCircleChangeCenter(arId, $event) {
  //   // const index = this.emitAreas.findIndex(a => a.arId === arId);
  //   // if (index >= 0) {
  //   //   this.emitAreas[index].ltd = $event.lat ? $event.lat : null;
  //   //   this.emitAreas[index].lng = $event.lng ? $event.lng : null;
  //   // } else {
  //   //   this.emitAreas.push({
  //   //     arId: arId,
  //   //     ltd: $event.lat ? $event.lat : null,
  //   //     lng: $event.lng ? $event.lng : null,
  //   //     radius: null
  //   //   });
  //   // }
  //
  //   //console.log("trigger change center", $event);
  //   this.areaChange.emit({
  //     arId: arId,
  //     ltd: $event.lat ? $event.lat : null,
  //     lng: $event.lng ? $event.lng : null,
  //     radius: null
  //   });
  //
  //   // console.log(this.emitAreas);
  // }
}
