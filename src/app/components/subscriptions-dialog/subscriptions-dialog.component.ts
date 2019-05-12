import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SubscriptionService } from 'src/app/services/subscription.service';
import {Subscription} from "../../models/subscription";

@Component({
  selector: 'app-subscriptions-dialog',
  templateUrl: './subscriptions-dialog.component.html',
  styleUrls: ['./subscriptions-dialog.component.scss']
})
export class SubscriptionsDialogComponent implements OnInit {

  form: FormGroup;
  zoom = 12;
  eventSubs = [];
  typeSubs = [];
  areaSubs: Subscription[] = [];

  hiddenSub = true;
  forDelete = [];
  forToggle: any[] = [];
  forAreasUpdate = new Set();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionsDialogComponent>,
    private subscriptionService: SubscriptionService) {

    this.form = this.fb.group({
      subscriptions: new FormArray([]),
      types: new FormArray([]),
      areas: new FormArray([])
    });
  }

  ngOnInit() {
    this.subscriptionService.getSubscriptions(1).subscribe(
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
        this.addCheckboxes();
        console.log("init areaSubs", this.areaSubs);
      }
    );
  }

  private addCheckboxes() {
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

  save() {
    // unsubscribe form subs
    if (this.forDelete.length > 0) {
      console.log("forDelete", this.forDelete);
      // this.subscriptionService.deleteSubscriptions(this.forDelete);
    }
    // toggle subs
    if (this.forToggle.length > 0) {
      console.log("forToggle", this.forToggle);
      // this.subscriptionService.toggleSubscriptions(this.forToggle);
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
    this.close();
  }

  showArea(subId) {
    // console.log(this.circle);
  }
  deleteSub(subId) {
    this.forDelete.push(subId);
  }
  onToggle(subId, $event) {
    const obj = {subId: subId, isEnable: $event.checked};
    const index = this.forToggle.findIndex(o => o.subId === obj.subId);
    if ( index < 0) {
      this.forToggle.push(obj);
    } else {
      this.forToggle.splice(index);
    }
    // console.log("forToggle: ", this.forToggle);
  }
  changeAreasOnMap($event) {
    const index = this.areaSubs.findIndex(a => a.id === $event.arId);
    // if exist
    if (index >= 0) {
      this.areaSubs[index].latitude = $event.ltd ? $event.ltd : this.areaSubs[index].latitude;
      this.areaSubs[index].longitude = $event.lng ? $event.lng : this.areaSubs[index].longitude;
      this.areaSubs[index].radius = $event.radius ? $event.radius : this.areaSubs[index].radius;

      this.forAreasUpdate.add(index);

      // console.log("after", this.areaSubs[index]);
      // console.log("forAreaUpdate", this.forAreasUpdate);
    }
  }
  /**Determines whether the id is in the forDelete array
   * @returns true if id is include
  */
  isHidden(id) {
    return this.forDelete.includes(id);
  }

  close() {
    this.dialogRef.close();
  }

}
