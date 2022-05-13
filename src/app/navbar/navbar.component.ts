import { AppUser } from './../models/AppUser';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.appUser$.subscribe({
      next: (user) => (this.appUser = user),
    });
  }

  logout() {
    this.authService.logout();
  }
}
