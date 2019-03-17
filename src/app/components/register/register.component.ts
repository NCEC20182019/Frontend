import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogConf=new MatDialogConfig();
    dialogConf.disableClose=true;
    dialogConf.autoFocus=true;
    dialogConf.data={email:"",
                     password:""}

    const dialogRef = this.dialog.open(RegisterDialogComponent, dialogConf);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // this.event = result;
        // this.event.location = result.location;
        // console.log(this.event);
        // this.save();
        console.log(result);
      }
    });
  }

}
