import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private Title: string = "Lemmeknow";
  private navLinks = [{relativePath: 'map', label: "Map View"},
                      {relativePath: 'calendar', label: "Calendar View"}];

  constructor(private router: Router, private bottomSheet: MatBottomSheet,
              private route: ActivatedRoute) { }

  @Input() public currentRoute: ActivatedRoute;

  ngOnInit() {
  }

  redirect(){
    this.router.navigate(['./login']);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(LoginFormComponent);
  }

  redirectHome(){
    this.router.navigate([''])
  }
}
