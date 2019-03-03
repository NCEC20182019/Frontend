import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lemmeknow';
  currentRoute: any;

  onMarkerPlaced(event){
    console.log(event)
  }
}
