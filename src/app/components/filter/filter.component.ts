import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatCheckboxChange} from "@angular/material";

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

  // coordFilter = false;

  private filterForm = {
    dateFrom: Date,
    dateTo: Date,
    area: {},
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
    this.filterForm.dateFrom = event.value;
    // this.minDate = event.value;
  }

  changeMaxDate(event) {
    this.filterForm.dateTo = event.value;
    // this.maxDate = event.value;
  }

  closeEm() {
    this.close.emit();
  }

  coordFilterChange($event: MatCheckboxChange) {
    this.coordFilterEvent.emit($event.checked);
  }

  onSubmit() {
    // get selected types
    this.ul.nativeElement.childNodes.forEach((li) => {
      if (li.childNodes[0]) {
        if (li.childNodes[0].firstChild.firstChild.firstChild.attributes[4].value !== 'false') {
          this.filterForm.types.push(li.childNodes[0].textContent.trim());
        }
      }
    });

    // get dates
    // this.filterForm.dateFrom = this.minDate;
    // this.filterForm.dateTo = this.maxDate;

    this.submit.emit(this.filterForm);
    // this.closeEm();
  }
}
