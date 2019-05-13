import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {MatDialogRef, MatSelectChange, MatSnackBar} from '@angular/material';
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
  areaSubs: Subscription[] = [];

  // typesToSubscribe = new FormControl();
  typeList: string[] = [];

  forDelete = [];
  forToggle: any[] = [];
  forAreasUpdate = new Set();
  forCreateArea: Subscription[] = [];

  radius = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionsDialogComponent>,
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    // this.form = this.fb.group({
    //   subscriptions: new FormArray([]),
    //   types: new FormArray([]),
    //   areas: new FormArray([])
    // });
  }

  ngOnInit() {
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

  addCheckboxes() {
    this.eventSubs.forEach((sub) => {
      if (sub.eventId) {
        (this.form.get('subscriptions') as FormArray).push(new FormControl(sub.enabled));
      }});
    this.typeSubs.forEach((sub) => {
      if (sub.type) {
        (this.form.get('types') as FormArray).push(new FormControl(sub.enabled));
      }
    });
    this.areaSubs.forEach((sub) => {
      if (sub.radius && sub.longitude && sub.latitude) {
        (this.form.get('areas') as FormArray).push(new FormControl(sub.enabled));
      }
    });
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

  save() {
    // unsubscribe form subs
    if (this.forDelete.length > 0) {
      // console.log("forDelete", this.forDelete);
      this.subscriptionService.deleteSubscriptions(this.forDelete);
    }
    // toggle subs
    if (this.forToggle.length > 0) {
      // console.log("forToggle", this.forToggle);
      this.subscriptionService.toggleSubscriptions(this.forToggle);
    }
    // update areas
    if (this.forAreasUpdate.size > 0) {
      this.subscriptionService.updateAreas(this.areaSubs.
        filter((v, i) => this.forAreasUpdate.has(i))
      );
      // console.log("forAreasUpdate", this.areaSubs.
      //   filter((v, i) => this.forAreasUpdate.has(i))
      // );
    }

    // save new typeSubs
    this.close();
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
      const obj = {subId: sub.id, isEnable: $event.checked};
      const index = this.forToggle.findIndex(o => o.subId === obj.subId);
      if ( index < 0) {
        this.forToggle.push(obj);
      } else {
        this.forToggle.splice(index);
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

  changeAreasOnMap($event) {
    const index = this.areaSubs.findIndex(a => a.id === $event.arId);
    // if exist
    if (index >= 0) {
      // console.log("input", $event);
      this.areaSubs[index].latitude = $event.ltd ? $event.ltd : this.areaSubs[index].latitude;
      this.areaSubs[index].longitude = $event.lng ? $event.lng : this.areaSubs[index].longitude;
      this.areaSubs[index].radius = $event.radius ? $event.radius : this.areaSubs[index].radius;

      this.forAreasUpdate.add(index);

      // console.log("after", this.areaSubs[index]);
      // console.log("radius", this.radius);
    }
  }
  /**Determines whether the id is in the forDelete array
   * @returns true if id is include
  */
  // isHidden(id) {
  //   if (id) {
  //     return this.forDelete.includes(id);
  //   }
  // }

  close() {
    this.dialogRef.close();
  }

}
