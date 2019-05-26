import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ILocation} from '../../models/ilocation';
import {IEvent} from '../../models/ievent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() Events: IEvent[] = [];
  @Input() filter: boolean;
  @Input() areas: any[];
  @Output() markerPlaced: EventEmitter<ILocation> = new EventEmitter();
  @Output() onOverArea: EventEmitter<any> = new EventEmitter();

  @ViewChild('coordFilter') myCircle;
  @Input() filterSubmit = false;
  @Input() center: any = 'city';

  userLocation: ILocation = {
    id: null,
    name: '',
    latitude: 0,
    longitude: 0
  };

  private userMarker = {
    url: '../../../assets/blue-marker.png',
  };

  @Input() public currentMarker: any;

  public zoom = 12;


  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation.latitude = position.coords.latitude;
        this.userLocation.longitude = position.coords.longitude;
      });
    }
  }

  onChooseLocation(event) {
    this.currentMarker =  {
      latitude: event.coords.lat,
      longitude: event.coords.lng,
    };

    this.markerPlaced.emit(this.currentMarker);
  }

  onCreateArea($event) {
    if (this.areas) {
      this.areas.push({
        id: null,
        userId: null,
        radius: 1000,
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        enabled: true,
        name: null
      });
    }
  }

  onAreaChange(index, $event) {
    if (index >= 0) {
      this.areas[index].latitude = $event.lat ? $event.lat : this.areas[index].latitude;
      this.areas[index].longitude = $event.lng ? $event.lng : this.areas[index].longitude;
      this.areas[index].radius = typeof $event === 'number' ? $event : this.areas[index].radius;
    }
  }

  overArea(area, flag) {
    this.onOverArea.emit({flag: flag, id: area.id, name: area.name});
  }

  getBounds() {
    if (this.myCircle) {
      const center: any = {};
      center.latitude = this.myCircle.nativeElement.attributes.latitude.value;
      center.longitude = this.myCircle.nativeElement.attributes.longitude.value;
      const radius: number = this.myCircle.nativeElement.attributes.radius.value;
      return {
        center: center,
        radius: radius
      };
    } else {
      return null;
    }
  }

  whereToCenter() {
    if (this.center) {
      if (this.center === 'event') {
        return {ltd: this.Events[0].location.latitude,
          lng: this.Events[0].location.longitude
        };
      } else if (this.center === 'user') {
        return {ltd: this.userLocation.latitude,
          lng: this.userLocation.longitude
        };
      } else if (this.center === 'city') {
        return {ltd:  51.6720400,
                lng:  39.1843000}
      } else if(this.center.latitude||this.center.longitude){
        return {ltd: this.center.latitude,
                lng: this.center.longitude}
      }
    } else {
      return {ltd: this.userLocation.latitude ? this.userLocation.latitude : 51.6720400,
        lng: this.userLocation.longitude ? this.userLocation.longitude : 39.1843000
      };
    }
  }
}
