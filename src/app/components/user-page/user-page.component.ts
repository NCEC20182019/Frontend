import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {DataService} from "../../services/data.service";
import {MatSnackBar} from "@angular/material";
import {PasswordValidation} from "../equalto.validator";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  infoForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    this.infoForm = this.formBuilder.group({
        id:[this.user().id],
        username: [this.user().username, []],
        email: [this.user().email, [ Validators.email]],
        password: ['', [ Validators.minLength(6)]],
        repeatPassword: ['', [ Validators.minLength(6)]],
        oldPassword: ['', [ Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  user(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


  // convenience getter for easy access to form fields
  get f() { return this.infoForm.controls; }

  submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.infoForm.invalid) {
      return;
    }

    this.loading = true;
    this.dataService.registerUser(this.infoForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackBar.open("Data changed successfully", 'Close', {duration: 3000});
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.router.navigate(['/']);
        },
        error => {
          this.snackBar.open("Changing failed", 'Close', {duration: 3000});
          this.loading = false;
        });
  }
}
