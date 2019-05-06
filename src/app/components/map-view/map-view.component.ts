import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  @Output() filter;
  @Output() Events: IEvent[];
  // @Output() INITIAL_DELAY: number = 850;

  private spinner: boolean = true;
  private Filter: boolean = false;
  markerPlaced = new EventEmitter();

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
     this.Events = this.data.getEvents();
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
    this.Filter = true;
  }
  
  onFilterClose(){
    this.Filter = false;
  }

  changeCoordFilter(event){
    this.filter = event;
  }
}
