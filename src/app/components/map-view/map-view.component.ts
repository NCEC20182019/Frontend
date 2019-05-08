import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  @ViewChild('app-map') mapCmp: MapComponent;

  private filter: boolean;
  @Output() coordFilter;
  @Output() Events: IEvent[];
  // @Output() INITIAL_DELAY: number = 850;

  @Output() private filterSubmit = false;
  private spinner: boolean = true;
  markerPlaced = new EventEmitter();


  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
     this.Events = this.data.getMockEvents();
  }

  /** Method of redirecting to single Event page */
  redirectTo(_id){
    console.log(_id);
    this.router.navigate([_id], { relativeTo: this.route })
  }

  onMarkerPlaced(event){
    this.markerPlaced.emit(event);
  }

  spinnerCheck(){
    setTimeout(() => {
      this.spinner = false
    }, 5000);
    this.spinner = this.Events.length !== 0;
  }

  onFilter(){
    this.filter = true;
  }
  
  onFilterClose(){
    this.filter = false;
  }

  changeCoordFilter(event){
    this.coordFilter = event;
  }

  onFilterSubmit(){
    console.log("Submit caught");
    this.mapCmp.getBounds();
  }
}
