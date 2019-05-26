import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { IEvent } from '../../models/ievent';
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {
  @Input() Events: IEvent[] = [];
  @Input() isFiltering;
  @Output() pageChanged = new EventEmitter();
  @Output() filterCleared = new EventEmitter();

  // Properties for MatTable be working
  public dataSource = new MatTableDataSource<IEvent>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public columnsToDisplay: String[] = ['title'];

  /**
   * data: Service, which does an http request for list of Events
   * route: Thing for components communication (literally for proper routing)
   * router: Thing that completes routing within this very component  */
  constructor() {
  }

  // Init method
  ngOnInit() {
    this.createDataSource();
    // setTimeout(() => this.createTable(), this.INITIAL_DELAY)
  }

  createTable() {
    this.dataSource = new MatTableDataSource<IEvent>(this.Events);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // console.log(this.dataSource);
    // this.dataSource.sort = this.sort;
    // this.dataSource.data update
  }

  onPageChanged(event){
    this.pageChanged.emit(event);
  }

  clearFilter() {
    this.filterCleared.emit();
  }

  createDataSource() {
    // console.log(this.Events.length);
    // console.log(this.Events);
    this.createTable();
    // console.log(this.dataSource);
    return true;
  }

  events() {
    return !!this.Events.length ? (this.dataSource.data.length ? true : this.createDataSource()) : false;
  }
}
