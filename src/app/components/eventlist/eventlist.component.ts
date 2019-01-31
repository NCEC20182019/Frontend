import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IEvent } from '../IEvent';
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {
  //Basic properties that component must include  
  public Events: IEvent[] = [];

  //Properties for MatTable be working
  public dataSource = new MatTableDataSource<IEvent>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator
  public columnsToDisplay: String[] = ['name', 'type', 'link', 'redirect']

  eventsReady = new EventEmitter();

  //Trying to complete data flow between components (with event emitter)
  // @Output() public sendRoute = new EventEmitter();

  /**
   * data: Service, which does an http request for list of Events
   * route: Thing for components communication (literally for proper routing)
   * router: Thing that completes routing within this very component  */
  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }
  
  //Init method
  ngOnInit() {
    this.getEvents();
    // this.sendRoute.emit(this.route);
  }

  //Method of filling our Events prop with data
  getEvents(){
    this.data.getEvents().subscribe(
      (_events: IEvent[]) => {
        this.Events = _events;
        this.createTable();
      }
    )
  }

  createTable(){
    this.dataSource = new MatTableDataSource<IEvent>(this.Events);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Method of redirecting to single Event page
  redirectTo(_id){
    this.router.navigate([_id], { relativeTo: this.route })
  }
}
