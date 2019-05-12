import {Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../../models/ilocation';
import { IEvent } from '../../models/ievent';
import {AgmCircle} from "@agm/core";

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
  @Output() areaChange: EventEmitter<any> = new EventEmitter();
  private emitAreas: any[] = [];

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
  onCircleChangeRadius(arId, $event) {
    // const index = this.emitAreas.findIndex(a => a.arId === arId);
    // if (index >= 0) {
    //   this.emitAreas[index].radius = typeof $event === 'number' ? $event: null;
    // } else {
    //   this.emitAreas.push({
    //     arId: arId,
    //     ltd: null,
    //     lng: null,
    //     radius: typeof $event === 'number' ? $event: null
    //   });
    // }


      console.log("trigger change radius", $event);
      const radius = typeof $event === 'number' ? $event : null;
      this.areaChange.emit({
        arId: arId,
        ltd: null,
        lng: null,
        radius: radius
      });

    // console.log(this.emitAreas);
  }
  onCircleChangeCenter(arId, $event) {
    // const index = this.emitAreas.findIndex(a => a.arId === arId);
    // if (index >= 0) {
    //   this.emitAreas[index].ltd = $event.lat ? $event.lat : null;
    //   this.emitAreas[index].lng = $event.lng ? $event.lng : null;
    // } else {
    //   this.emitAreas.push({
    //     arId: arId,
    //     ltd: $event.lat ? $event.lat : null,
    //     lng: $event.lng ? $event.lng : null,
    //     radius: null
    //   });
    // }

    //console.log("trigger change center", $event);
    this.areaChange.emit({
      arId: arId,
      ltd: $event.lat ? $event.lat : null,
      lng: $event.lng ? $event.lng : null,
      radius: null
    });

    // console.log(this.emitAreas);
  }
}
