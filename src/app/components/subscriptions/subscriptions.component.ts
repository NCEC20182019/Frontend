import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SubscriptionsDialogComponent } from '../subscriptions-dialog/subscriptions-dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;

    const dialogRef = this.dialog.open(SubscriptionsDialogComponent, dialogConf);

  }
}
