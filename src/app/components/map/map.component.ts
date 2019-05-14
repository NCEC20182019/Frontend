import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation } from '../../models/ilocation';
import { IEvent } from '../../models/ievent';
import { AgmCircle } from '@agm/core';
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

  @ViewChild('coordFilter') myCircle;
  @Input() filterSubmit = false;
  @Input() center: String;

  userLocation: ILocation = {
    id: null,
    name: '',
    ltd: 0,
    lng: 0
  };

  private userMarker = {
    url: '../../../assets/blue-marker.png',
  };

  private currentMarker: ILocation;

  private zoom = 12;


  constructor() { }

  ngOnInit() {
    this.Events.forEach(event => {
        event.pic = 'https://picsum.photos/50/50/?random';
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.ltd = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;
      });
    }
  }

  onChooseLocation(event) {
    this.currentMarker =  {
      id: null,
      ltd: event.coords.lat,
      lng: event.coords.lng,
      name: ''
    };

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

  getBounds(){
    if(this.myCircle) {
      let center: ILocation;
      center.ltd = this.myCircle.nativeElement.attributes.latitude.value;
      center.lng = this.myCircle.nativeElement.attributes.longitude.value;
      let radius: number = this.myCircle.nativeElement.attributes.radius.value;
      return {
        center: center,
        radius: radius
      }
    }else{
      return null;
    }
  }

  whereToCenter() {
    if(this.center){
      if(this.center === 'event'){
        return {ltd: this.Events[0].location.ltd,
                lng: this.Events[0].location.lng}
      }else if(this.center === 'user'){
        return {ltd: this.userLocation.ltd,
                lng: this.userLocation.lng}
      }else if(this.center === 'city'){
        return {ltd:  51.6720400,
                lng:  39.1843000}
      }
    }else{
      return {ltd: (this.userLocation.ltd || this.userLocation.lng) ? this.userLocation.ltd : this.Events[0] ? this.Events[0].location.ltd : 51.6720400,
              lng: (this.userLocation.ltd || this.userLocation.lng) ? this.userLocation.lng : this.Events[0] ? this.Events[0].location.lng : 39.1843000}
    }
  }
}
