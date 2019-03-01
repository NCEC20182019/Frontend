import { Component, OnInit, Output } from '@angular/core';
import { IEvent } from '../ievent';
import { DataService } from 'src/app/services/data.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  @Output() Events: Observable<IEvent[]>;
  // @Output() INITIAL_DELAY: number = 850;

  private spinner: boolean = true;

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getEvents();
    this.Events.subscribe(() => this.spinner=false)
  }

  getEvents(){
     this.Events = this.data.getEvents();
  }

  /** Method of redirecting to single Event page */
  redirectTo(_id){
    console.log(_id);
    this.router.navigate([_id], { relativeTo: this.route })
  }

}
