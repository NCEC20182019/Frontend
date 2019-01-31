import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IEvent } from '../IEvent';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { MapComponent } from '../map/map.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  private currentEvent: IEvent;


  constructor(private dataService: DataService, private route: ActivatedRoute, private overlay: Overlay) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.getCurrentEvent(parseInt(params.get('id')));
      });
  }

  getCurrentEvent(_id){
    this.dataService.getEvents().subscribe(
      (events: IEvent[]) => {
        this.currentEvent = events.filter( (x) => x.id === _id )[0];
      }
    )
  }

  mapView(){
    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create();

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(MapComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
  }
 
}
