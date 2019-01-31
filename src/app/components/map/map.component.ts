import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  private latitude = 51.668174;
  private longitude = 39.221370;

  constructor() { }

  ngOnInit() {
  }

}
