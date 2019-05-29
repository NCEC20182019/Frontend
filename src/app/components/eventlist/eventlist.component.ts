import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {IEvent} from '../../models/ievent';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit, OnDestroy, OnChanges {
  @Input() Events: IEvent[];
  @Input() isFiltering;
  @Output() pageChanged = new EventEmitter();
  @Output() filterCleared = new EventEmitter();
  @Output() eventCardClick = new EventEmitter();

  obs: Observable<any>;
  public dataSource = new MatTableDataSource<IEvent>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * data: Service, which does an http request for list of Events
   * route: Thing for components communication (literally for proper routing)
   * router: Thing that completes routing within this very component  */
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<IEvent>(this.Events);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  // Init method
  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  createDataSource() {
    return true;
  }

  onPageChanged(event) {
    this.pageChanged.emit(event);
  }

  clearFilter() {
    this.filterCleared.emit();
  }

  events() {
    return !!this.Events.length ? (this.dataSource.data.length ? true : this.createDataSource()) : false;
  }

  getImageUrl(eventId) {
    const url = this.Events.find(e => e.id === eventId).image_url;
    return url ? url : '../../../assets/no_logo_50x50.png';
  }

  onCardClick(eventId) {
    this.eventCardClick.emit(eventId);
  }

  private _dateFormatInner(str_date: String) {
    const [date, time] = str_date.split('T');
    const [hrs, mins] = time.split(':');
    return date.split('-').reverse().join('/') + ' ' + hrs + ':' + mins;
  }

  dateFormat(str_date1: String, str_date2: String) {
    if (str_date1 && str_date2) {
      const [date1, time1] = this._dateFormatInner(str_date1).split(' ');
      const [date2, time2] = this._dateFormatInner(str_date2).split(' ');
      return date1 === date2 ? `${date1} c ${time1} по ${time2}` : `c ${date1}, ${time1} по ${date2}, ${time2}`;
    } else {
      return 'дата не задана..';
    }
  }

}
