import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { 

      this.form = this.fb.group({
        email: [this.data.email, [Validators.required, Validators.email]],
        password: [this.data.password, Validators.required],
        repeat_password: [this.data.repeat_password, Validators.required],
        date: [this.data.date, Validators.required]
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
