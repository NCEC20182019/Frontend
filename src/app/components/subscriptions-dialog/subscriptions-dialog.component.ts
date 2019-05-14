import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {MatDialogRef, MatSelectChange, MatSnackBar, MatTabChangeEvent} from '@angular/material';
import { SubscriptionService } from 'src/app/services/subscription.service';
import {Subscription} from "../../models/subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subscriptions-dialog',
  templateUrl: './subscriptions-dialog.component.html',
  styleUrls: ['./subscriptions-dialog.component.scss']
})
export class SubscriptionsDialogComponent implements OnInit {

  // current user id
  userId: number;
  // for view config
  form: FormGroup;
  zoom = 12;

  eventSubs = [];
  typeSubs = [];
  areaSubs = [];

  typeList: string[] = [];
  isMarked: any = {};

  @ViewChild('tabGroup') tabGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionsDialogComponent>,
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadSubscription();
  }

  loadSubscription() {
    this.eventSubs =[];
    this.typeSubs =[];
    this.areaSubs =[];

    this.userId = parseInt(this.route.snapshot.paramMap.get('id')) ? parseInt(this.route.snapshot.paramMap.get('id')) : 1;
    // TODO remove user_id mockup
    this.subscriptionService.getSubscriptions(this.userId).subscribe(
      (subs) => {
        subs.forEach((sub) => {
          if (sub.eventId) {
            this.eventSubs.push(sub);
          } else if (sub.type) {
            this.typeSubs.push(sub);
          } else if (sub.radius && sub.longitude && sub.latitude) {
            this.areaSubs.push(sub);
          }
        });
        // this.addCheckboxes();
        this.getTypeList();
        // console.log("init areaSubs", this.areaSubs);
      }
    );
  }
  getTypeList() {
    this.subscriptionService.getTypes().subscribe(
      data => data.forEach(
        d => {
          if (this.typeSubs.findIndex(t => t.type === d.type) < 0) {
            this.typeList.push(d.type);
          }
        })
    );
  }

  save(currentTab) {
    if (currentTab === 'Types') {
      this.subscriptionService.updatesAndCreate(this.typeSubs).subscribe(() => {},
        () => {this.openSnackBar('Saving error!');},
        () => {
          this.openSnackBar('Saved successful!');
          this.loadSubscription();
      });
    }

    if (currentTab === 'Areas') {
      this.subscriptionService.updatesAndCreate(this.areaSubs.map(ar => {
            if (!ar.userId) {
              ar.userId = this.userId;
            }
            return ar;
          })
      ).subscribe(() => {},
        () => {this.openSnackBar('Saving error!');},
        () => {
          this.openSnackBar('Saved successful!');
          this.loadSubscription();
      });
    }

    if (currentTab === 'Events')
    {
      this.subscriptionService.updatesAndCreate(this.eventSubs).subscribe(() => {},
        () => {this.openSnackBar('Saving error!');},
        () => {
          this.openSnackBar('Saved successful!');
          this.loadSubscription();
        });
    }
  }

  deleteSub(sub) {
    if (sub.id) {
      this.subscriptionService.deleteSubscription(sub.id).subscribe(
        () => {},
        () => this.openSnackBar(sub.name + " deleting error"),
        () => {
          this.openSnackBar(sub.name + " deleted successfully");
          this._deleteFromViewArray(sub);
        }
      );
    } else
      this._deleteFromViewArray(sub);
  }
  private _deleteFromViewArray(sub: any) {
    if (sub.type) {
      this.typeSubs.splice(this.typeSubs.indexOf(sub), 1);
      //TODO: тут баг, потому что тип возвращается в вып.список уже выбранный
      this.typeList.push(sub.type);
    } else if (sub.eventId) {
      this.eventSubs.splice(this.eventSubs.indexOf(sub), 1);
    } else if (sub.radius) {
      this.areaSubs.splice(this.areaSubs.indexOf(sub),1);
    }

  }
  openSnackBar(message: any, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onToggle(sub, $event) {
    if (sub.id) {
      if (sub.radius) {
        this.areaSubs[this.areaSubs.findIndex( a => a.id === sub.id)].enabled = $event.checked;
      }
      if (sub.type) {
        this.typeSubs[this.typeSubs.findIndex( t => t.id === sub.id)].enabled = $event.checked;
      }
      if (sub.eventId) {
        this.eventSubs[this.eventSubs.findIndex( e => e.id === sub.id)].enabled = $event.checked;
      }
    }
    // console.log("forToggle: ", this.forToggle);
  }

  onNewTypeSelect($event: MatSelectChange){
    // console.log($event);
    $event.value.forEach(t => {
      // TODO удаление не правильное удаляет до конца все
      this.typeList.splice(this.typeList.findIndex(tp => tp === t), 1);
      this.typeSubs.push({ name: t, type: t, enabled: true, userId: this.userId});
    });
    // console.log(this.typeSubs);
    // console.log(this.typeList);
  }

  // changeAreasOnMap($event: Subscription[]) {
  //   this.areaSubs = $event.map(ar => {
  //     if (!ar.userId) {
  //       ar.userId = this.userId;
  //     }
  //     return ar;
  //   });
  //   console.log(this.areaSubs);
  //   // const index = this.areaSubs.findIndex(a => a.id === $event.arId);
  //   // // if exist
  //   // if (index >= 0) {
  //   //   // console.log("input", $event);
  //   //   this.areaSubs[index].latitude = $event.ltd ? $event.ltd : this.areaSubs[index].latitude;
  //   //   this.areaSubs[index].longitude = $event.lng ? $event.lng : this.areaSubs[index].longitude;
  //   //   this.areaSubs[index].radius = $event.radius ? $event.radius : this.areaSubs[index].radius;
  //   //
  //   //   this.forAreasUpdate.add(index);
  //   //
  //   //   // console.log("after", this.areaSubs[index]);
  //   //   // console.log("radius", this.radius);
  //   // }
  // }

  close() {
    this.dialogRef.close();
  }

  onEnter(i, value: string) {
        this.areaSubs[i].name = value;
  }

  onMarked($event) {
    this.isMarked = {
      flag: $event.flag ? $event.flag: false,
      id: $event.id};
  }
}
