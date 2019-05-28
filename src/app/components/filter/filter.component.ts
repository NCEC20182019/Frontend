import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  constructor(
    private dataService: DataService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDay());
    this.typeList = [];
  }

  @ViewChild('listElement') ul;

  minDate: Date;
  maxDate: Date;
  typeList: any[];

  @Output() close = new EventEmitter();
  @Output() coordFilterEvent = new EventEmitter();
  @Output() submit = new EventEmitter();

  @Input() areaFilter;

  coordFilter = false;

  private filterForm = {
    dateFrom: this.minDate,
    dateTo: this.maxDate,
    area: {
      center: {
        latitude: 0,
        longitude: 0
      },
      radius: 0
    },
    types: []
  };

  ngOnInit() {
    this.loadTypeList();
  }

  loadTypeList() {
    this.dataService.getTypes().subscribe(
      data => this.typeList = data
    );
  }

  changeMinDate(event) {
    this.minDate = event.value;
  }

  changeMaxDate(event) {
    this.maxDate = event.value;
  }

  closeEm() {
    this.close.emit();
  }

  coordFilterChange(checked: boolean) {
    this.coordFilter = !checked;
    this.coordFilterEvent.emit(this.coordFilter);
  }

  onSubmit() {
    // TODO получение area стоит переписать
    this.submit.emit();

    // get selected types
    this.ul.nativeElement.childNodes.forEach((li) => {
      if (li.childNodes[0].firstChild.firstChild.firstChild.attributes[4].value !== 'false') {
        this.filterForm.types.push(li.childNodes[0].textContent.trim());
      }
    });

    // get dates
    this.filterForm.dateFrom = this.minDate;
    this.filterForm.dateTo = this.maxDate;

    this.filterForm.area = this.areaFilter;

    this.dataService.getFilteredEvents(this.filterForm);
  }
}
