import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    HomeComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // if we not to use this AngularFireModule.initializeApp({}) then our auth feature will not work.
    AngularFireModule.initializeApp(environment.firebase),

    AngularFireAuthModule,

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    NgbModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
