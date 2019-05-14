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
  @Input() areas: any[];
  @Output() markerPlaced: EventEmitter<ILocation> = new EventEmitter();
  @Output() onOverArea: EventEmitter<any> = new EventEmitter();

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
      radius: 1,
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      enabled: true,
      name: null
    });

  }

  onAreaChange(arId, $event) {
    const index = this.areas.findIndex(a => a.id === arId);
    if (index >= 0) {
      this.areas[index].latitude = $event.lat ? $event.lat : this.areas[index].latitude;
      this.areas[index].longitude = $event.lng ? $event.lng : this.areas[index].longitude;
      this.areas[index].radius = typeof $event === 'number' ? $event : this.areas[index].radius;
    }
  }

  overArea(arId, flag) {
    this.onOverArea.emit({flag: flag, id: arId});
  }
}
