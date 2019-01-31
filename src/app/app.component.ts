import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';
  currentRoute: any;

  event(_event){
    this.currentRoute = _event;
    console.log('НУ ТАК ВОТ ЖЕ ОНО');
  }
}
