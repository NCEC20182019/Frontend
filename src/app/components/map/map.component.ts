import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { ILocation } from '../ilocation';
import { IEvent } from '../ievent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() Events: Observable<any>;
  @Output() markerPlaced: EventEmitter<ILocation> = new EventEmitter();
  eventList: IEvent[] = [];

  userLocation: ILocation = {
    name: '',
    ltd: 0,
    lng: 0
  }

  private userMarker = {
    url: '../../../assets/blue-marker.png',
  }

  private currentMarker: ILocation;

  private zoom = 12;

  
  constructor() { }

  ngOnInit() {
    this.Events.subscribe((data) => {
      // console.log(data);
      this.eventList = data;
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.ltd = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;
        // console.log(this.userLocation);
      });
    }
  }

  onChooseLocation(event){
    this.currentMarker =  { ltd: event.coords.lat,
                            lng: event.coords.lng,
                            name: '' }
  }

  onClick(){
    this.markerPlaced.emit(this.currentMarker);
  }
}
