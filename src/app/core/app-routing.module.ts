import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { EventViewComponent } from '../components/event-view/event-view.component'
import { MapViewComponent } from '../components/map-view/map-view.component';
import { LoginPageComponent } from "../components/login-page/login-page.component";
import { RegisterPageComponent } from "../components/register-page/register-page.component";
import {UserPageComponent} from "../components/user-page/user-page.component";
import {EventEditComponent} from "../components/event-edit/event-edit.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'app/events'
  },
  {
    path: 'app/login',
    component: LoginPageComponent
  },
  {
    path: 'app/register',
    component: RegisterPageComponent
  },
  {
    path: 'app/events',
    component: MapViewComponent
  },
  {
    path: 'app/events/:id',
    component: EventViewComponent
  },
  {
    path: 'app/events/:id/edit',
    component: EventEditComponent
  },
  {
    path: 'app/me',
    component: UserPageComponent
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
