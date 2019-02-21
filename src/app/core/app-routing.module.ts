import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { EventlistComponent } from '../components/eventlist/eventlist.component';
import { EventViewComponent } from '../components/event-view/event-view.component'
import { MapComponent } from '../components/map/map.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MapViewComponent } from '../components/map-view/map-view.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'app/events'
  },
  {
    path: 'app/events',
    component: MapViewComponent,
  },
  {
    path: 'app/events/:id',
    component: EventViewComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
