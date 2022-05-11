import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    // it returns observable<boolean>
    return this.authService.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        // if I hit such a type of url that has no access if you do not signed in, then in this condition this
        // optional queryParams will works.
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
