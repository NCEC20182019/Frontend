import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
// import { MapOverlayService } from 'src/app/services/map.overlay';
import { Overlay } from '@angular/cdk/overlay';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  private currentEvent: IEvent;

  constructor(private dataService: DataService, /*private mapOverlay: MapOverlayService,*/ private route: ActivatedRoute, private overlay: Overlay) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.getCurrentEvent(parseInt(params.get('id')));
      });
  }

  getCurrentEvent(_id){
    this.dataService.getEvent(_id);
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
