import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/AppUser';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shouldShowLogin: boolean;
  shoppingCartItemCount: number = 0;
  cart$!: Observable<ShoppingCart>;

  constructor(
    public authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.appUser = {} as AppUser;
    this.shouldShowLogin = true;
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe({
      next: (user) => {
        this.appUser = user as AppUser;
      },
    });

    this.shouldShowLogin = !this.authService.isTokenAvailable();

    // this is the one way to get the total items count...

    // this.shoppingCartService.getShoppingCartItemsCount().then((value) => {
    //   value.subscribe((val) => (this.shoppingCartItemCount = val));
    // });

    // this is called wrapping and we have to unwrap this observable in html file using async pipe.
    this.cart$ = await this.shoppingCartService.getCart();

    // or we can write as like bellow...

    // this.cart$.subscribe(
    //   (cart) => (this.shoppingCartItemCount = cart.totalSelectedItemsCount)
    // );
  }

  logout() {
    this.authService.logout();
    this.shouldShowLogin = !this.authService.isTokenAvailable();
  }
}
