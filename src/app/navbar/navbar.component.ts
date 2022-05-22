import { AppUser } from './../models/AppUser';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(public authService: AuthService) {
    this.appUser = {} as AppUser;
  }

  ngOnInit(): void {
    this.authService.appUser$.subscribe({
      next: (user) => (this.appUser = user as AppUser),
    });
  }

  logout() {
    this.authService.logout();
  }
}
