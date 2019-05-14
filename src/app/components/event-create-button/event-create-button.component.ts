import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EventCreateDialogComponent} from '../event-create-dialog/event-create-dialog.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-event-create-button',
  templateUrl: './event-create-button.component.html',
  styleUrls: ['./event-create-button.component.scss']
})
export class EventCreateButtonComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private cookieService: CookieService) { }

  ngOnInit() {
  }


  openDialog(): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;

    this.dialog.open(EventCreateDialogComponent, dialogConf);
  }

  currentUser(): boolean{
    return !!this.cookieService.get("token");
  }

}
