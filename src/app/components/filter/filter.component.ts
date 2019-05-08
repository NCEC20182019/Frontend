import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  @Output() close = new EventEmitter();
  @Output() coordFilterEvent = new EventEmitter();
  @Output() submit = new EventEmitter();

  coordFilter: boolean = false;


  constructor() { 
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDay());
  }

  ngOnInit() {
  }

  changeMinDate(event){
    this.minDate = event.value;
  }

  changeMaxDate(event){
    this.maxDate = event.value;
  }

  closeEm(){
    this.close.emit();
  }



  coordFilterChange(checked: boolean){
    this.coordFilter = !checked;
    this.coordFilterEvent.emit(this.coordFilter);
  }

  onSubmit(){
    console.log("Submit emit")
    this.submit.emit();
  }
}
