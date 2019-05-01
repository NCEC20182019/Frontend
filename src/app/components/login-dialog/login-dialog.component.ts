import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private dataService: DataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {

      this.form = this.fb.group({
        email: [this.data.email, Validators.required, Validators.email],
        password: [this.data.password, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    let dataToPass = this.form.value;

    this.dialogRef.close(dataToPass);
  }

  close() {
    this.dialogRef.close();
  }

}
