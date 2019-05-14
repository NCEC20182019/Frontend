import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { IEvent } from '../../models/ievent';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { ILocation} from "../../models/ilocation";
import {FilterComponent} from "../filter/filter.component";
import {EventlistComponent} from "../eventlist/eventlist.component";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  @ViewChild('map') mapCmp: MapComponent;
  @ViewChild('filter') filterCmp: FilterComponent;
  @ViewChild('eventlist') eventlistCmp: EventlistComponent;

  private filterForm: {
    dateFrom: Date,
    dateTo: Date,
    area: {
      center: ILocation,
      radius: number
    },
    types: string[]
  };

  private filter: boolean;
  @Output() coordFilter;
  @Output() Events: IEvent[] = [];

  @Output() private filterSubmit = false;
  private spinner: boolean = true;
  markerPlaced = new EventEmitter();


  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
      this.Events = this.dataService.getEvents(1, this.filterForm);
    // this.Events = this.dataService.getMockEvents();
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
    this.spinner = this.Events.length != 0;
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

  onFilterSubmit(event){
    this.filterForm = event;
    this.filterForm.area = this.mapCmp.getBounds();
    this.getEvents();
  }

  onPageChanged() {
    this.getEvents();
  }

  filterFormIsEmpty(): boolean {
    return !this.filterForm;
  }

  onFilterCleared() {
    this.filterForm = null;
    this.filterCmp = new FilterComponent();
    this.getEvents();
  }
}
