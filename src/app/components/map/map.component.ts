import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../../models/ilocation';
import { IEvent } from '../../models/ievent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() Events: IEvent[];
  @Input() filter: boolean;
  @Output() markerPlaced: EventEmitter<ILocation> = new EventEmitter();

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
    this.currentMarker =  { ltd: event.coords.lat,
                            lng: event.coords.lng,
                            name: '' };

    this.markerPlaced.emit(this.currentMarker);
    // console.log(this.currentMarker)
  }
}
