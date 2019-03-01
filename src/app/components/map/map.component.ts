import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from "rxjs";
import { ILocation } from '../ilocation';
import { IEvent } from '../ievent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {


  @Input() Events: Observable<IEvent[]>;
  eventList: IEvent[];
  show=true;

  userLocation: ILocation = {
    ltd: 0,
    lng: 0
  }

  private userMarker = {
    url: '../../../assets/blue-marker.png',
  }

  private currentMarker: ILocation;

  private zoom = 12;

  
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.Events.subscribe((data) => {
      this.eventList = data;
      this.eventList.forEach(event => {
        event.pic = "https://picsum.photos/50/50/?random"
      });
      // console.log(data);
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.ltd = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;
      });
    }
  }

  onChooseLocation(event){
    this.currentMarker =  {ltd: event.coords.lat,
                           lng: event.coords.lng}
      console.log(event);
     }
}
