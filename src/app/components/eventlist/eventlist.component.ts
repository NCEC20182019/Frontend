import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
import { IEvent } from '../../models/ievent';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatBottomSheet } from '@angular/material';
import { Observable, from, of } from 'rxjs';
//import { repeat, skipWhile} from 'rxjs/Operators';
import {EventDetailComponent } from '../event-detail/event-detail.component';
import { DataService } from 'src/app/services/data.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {
  @Input() Events: IEvent[];
  @Input() isFiltering;
  @Output() pageChanged = new EventEmitter();
  @Output() filterCleared = new EventEmitter();

  // Properties for MatTable be working
  public dataSource = new MatTableDataSource<IEvent>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public columnsToDisplay: String[] = ['title'];

  /**
   * data: Service, which does an http request for list of Events
   * route: Thing for components communication (literally for proper routing)
   * router: Thing that completes routing within this very component  */
  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  // Init method
  ngOnInit() {
    this.createTable(this.Events);
    // setTimeout(() => this.createTable(), this.INITIAL_DELAY)
  }

  createTable(data) {
    this.dataSource = new MatTableDataSource<IEvent>(data);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSource.data update
  }

  onPageChanged(event){
    this.pageChanged.emit(event);
  }

  clearFilter() {
    this.filterCleared.emit();
  }
}
