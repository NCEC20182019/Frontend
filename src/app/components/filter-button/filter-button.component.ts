import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

  @Output() filter = new EventEmitter();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  thisPage() {
    return this.router.isActive('app/events', false);
  }

  onClick() {
    this.filter.emit();
  }

}
