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
  shouldShowLogin: boolean;

  constructor(public authService: AuthService) {
    this.appUser = {} as AppUser;
    this.shouldShowLogin = true;
  }

  ngOnInit(): void {
    this.authService.appUser$.subscribe({
      next: (user) => {
        this.appUser = user as AppUser;
      },
    });

    this.shouldShowLogin = !this.authService.isTokenAvailable();
  }

  logout() {
    this.authService.logout();
    this.shouldShowLogin = !this.authService.isTokenAvailable();
  }
}
