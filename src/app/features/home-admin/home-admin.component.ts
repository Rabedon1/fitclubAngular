import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  standalone: false
})
export class HomeAdminComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.logout();
  }
}
