import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'organic-shop';

  constructor(private authService: AuthService, private router: Router) {
    // when user loggedin or even logged out, each time of logging and logged out this observable variable user$ updated.
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          // this will work when user want to access protected route without login
          // when they login app will automatically redirect to that url which he or she want to visit and hit before login
          let returnUrl: any = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
          return true;
        }
        return false;
      },
    });
  }
}
