import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {  AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';
import {User} from "../../models/user";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = "/";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [ Validators.required, Validators.email]],
            password: ['', [ Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .subscribe(
        (data: {token: string, time: number, refresh: string, user: User}) => {
          this.authenticationService.setCurrentUser(data.user, data.token , data.refresh);
          this.router.navigate([this.returnUrl]);
          setTimeout(() => {
            this.authenticationService.refreshTokens();
          }, data.time - 100);
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.snackBar.open("Bad credentials", "Close", {duration: 3000})
        }
      );
    }
}
