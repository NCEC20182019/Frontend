import { Injectable } from "@angular/core";
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { EventViewComponent } from "../components/event-view/event-view.component";

@Injectable({
  providedIn: 'root'
})
export class MapOverlayService {

  // Inject overlay service
  constructor(private overlay: Overlay) { }

  open() {
    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create();

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(EventViewComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
  }
}