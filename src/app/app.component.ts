import { UserService } from './services/user.service';
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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    // when user loggedin or even logged out, each time of logging and logged out this observable variable user$ updated.
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          // this will save the user into databases
          this.userService.save(user);

          // this will work when user want to access protected route without login
          // when they login app will automatically redirect to that url which he or she want to visit and hit before login
          let returnUrl: any = localStorage.getItem('returnUrl');
          console.log('Return URL = ' + returnUrl);

          if (returnUrl) this.router.navigateByUrl(returnUrl);

          // need to remove this returnUrl beacuse, If I am not to remove this returnUrl
          // then, app will redirect that url each reloading time.
          localStorage.removeItem('returnUrl');
          // return true;
        }
        // return false;
      },
    });
  }
}
