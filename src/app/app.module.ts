import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatTabsModule, MatButtonModule, MatBottomSheetModule, 
         MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatInputModule,
         MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule, 
         MatDatepickerModule,MatNativeDateModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from '@angular/cdk/overlay';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './components/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventDetailDialogComponent } from './components/event-detail-dialog/event-detail-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations:
  [
    AppComponent,
    HeaderComponent,
    MapComponent,
    NotFoundComponent,
    ListComponent,
    FooterComponent,
    EventlistComponent,
    MapViewComponent,
    EventViewComponent,
    EventDetailComponent,
    EventDetailDialogComponent,
    LoginComponent,
    LoginDialogComponent,
    UserPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    FilterComponent,
    FilterButtonComponent,
    LogoutComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5yLtG88oIAl-r1z5SOIK4mwpVXTQWk5Y'
    }),
    AgmSnazzyInfoWindowModule,
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
    MatCheckboxModule,
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
    MatDatepickerModule,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ 
    MapComponent,
    EventDetailDialogComponent,
    LoginDialogComponent
  ]
})
export class AppModule { }
