import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatTabsModule, MatButtonModule, MatBottomSheetModule, 
         MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatInputModule,
         MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDatepickerModule,MatNativeDateModule, MatDialogModule } from '@angular/material';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from '@angular/cdk/overlay';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SecurityComponent } from './components/security/security.component';
import { ListComponent } from './components/list/list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventDetailDialogComponent } from './components/event-detail-dialog/event-detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    CalendarComponent,
    NotFoundComponent,
    SecurityComponent,
    ListComponent,
    LoginFormComponent,
    FooterComponent,
    EventlistComponent,
    MapViewComponent,
    EventViewComponent,
    OverlayComponent,
    EventDetailComponent,
    EventDetailDialogComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5yLtG88oIAl-r1z5SOIK4mwpVXTQWk5Y'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ 
    MapComponent,
    LoginFormComponent,
    EventDetailDialogComponent
  ]
})
export class AppModule { }
