import { Component, OnInit, OnDestroy, Inject,Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, of, from} from 'rxjs';
import { ILocation } from '../ilocation';
import { IEvent } from '../ievent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.scss']
})
export class EventDetailDialogComponent implements OnInit{

  form:FormGroup;
  isExist:boolean;

  curCoords: ILocation = {
    name: "",
    lng: 0,
    ltd: 0
  };
  emptyEvent: IEvent ={
    title:"",
    description:"",
    date_end:'',
    date_start:'',
    type:'',
    source_uri:{},
    location:{name:"",lng:0,ltd:0},
    pic:'',
    id:0
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:IEvent) {
      this.isExist = data.id ? true: false;

      this.form = this.fb.group({
        title: [this.data.title, Validators.required],
        description: [this.data.description, Validators.required],
        date_start: [this.data.date_start, Validators.required],
        date_end: [this.data.date_end, Validators.required],
        source_url: [this.data.source_uri,Validators.required],
        type: [this.data.type,Validators.required],
        name_location: [this.data.location.name,Validators.required]
    });
    }

    ngOnInit() {
      
    }

    save() {
      let dataToPass:IEvent=this.form.value;
      
      dataToPass.location = {
        name: this.form.value.name_location,
        lng: this.curCoords.lng,
        ltd: this.curCoords.ltd
      };

      this.dialogRef.close(dataToPass);
    }

    close() {
      this.dialogRef.close();
    }

    delete(){
      this.dialogRef.close(this.data.id);
    }

    onMarkerPlaced(location: ILocation){
      console.log('onMarkerPlaced ', location);
      this.curCoords=location;
    }

    passEventToMap(){
      let n:IEvent[] =[];
      n.push(this.data?this.data:this.emptyEvent);
      return of(n);
    }
}
