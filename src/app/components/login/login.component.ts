import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogConf=new MatDialogConfig();
    dialogConf.disableClose=true;
    dialogConf.autoFocus=true;
    dialogConf.data={email:"",
                     password:""}

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConf);

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
