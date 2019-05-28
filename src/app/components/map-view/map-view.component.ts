import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IEvent} from '../../models/ievent';
import {DataService} from 'src/app/services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MapComponent} from '../map/map.component';
import {ILocation} from "../../models/ilocation";
import {FilterComponent} from "../filter/filter.component";
import {EventlistComponent} from "../eventlist/eventlist.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  @ViewChild('map') mapCmp: MapComponent;
  @ViewChild('filter') filterCmp: FilterComponent;
  @ViewChild('eventlist') eventlistCmp: EventlistComponent;

  private area: {
      center: ILocation,
      radius: number
  };

  private filter: boolean;
  @Output() coordFilter;
  @Output() Events: IEvent[] = [];

  // @Output() private filterSubmit = false;
  private spinner: boolean = true;
  markerPlaced = new EventEmitter();
  eventSubscription: Subscription;


  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEvents();
    this.eventSubscription = this.dataService.eventList$
      .subscribe(events => {
        this.toEvents(events);
        this.eventlistCmp.ngOnInit();
      });

  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  toEvents(events: IEvent[]) {
    if (!this.Events.length || this.filter) {
      this.Events = events;
      return;
    }

    for (let event of events) {
      let index = this.Events.findIndex(e => e.id === event.id);
      if (index >= 0) {
        this.Events[index] = event;
      } else {
        this.Events.push(event);
        // console.log(this.Events);
      }
    }
    // events.forEach((event, i) => {
    //   let index = this.Events.findIndex(e => e.id === event[i].id);
    //   if (index !== -1) {
    //     this.Events[index] = events[i];
    //   } else {
    //     this.Events.push(event);
    //     console.log(this.Events);
    //   }
    // }, this);
  }

  getEvents() {
    this.dataService.getAllEvents();
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

  changeCoordFilter(event) {
    this.coordFilter = event;
  }

  onFilterSubmit() {
    // this.filterForm = event;
    this.area = this.mapCmp.getBounds();
    // this.getEvents();
  }

  onPageChanged() {
    this.getEvents();
  }

  filterFormIsEmpty(): boolean {
    // return !this.filterForm;
    return false;
  }

  onFilterCleared() {
    // this.filterForm = null;
    // TODO rewrite this
    this.filterCmp = null; // new FilterComponent();
    this.getEvents();
  }
}
