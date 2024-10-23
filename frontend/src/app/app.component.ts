import {Component, ViewChild, HostListener} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PaymentInformationComponent } from './payment-information/payment-information.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ManagePromotionsComponent } from './manage-promotions/manage-promotions.component';
import { ManageMoviesComponent } from './manage-movies/manage-movies.component';
import { HeaderComponent } from './header/header.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { SelectShowtimeComponent } from './select-showtime/select-showtime.component';
import { OrderSummaryComponent } from './ordersummary/ordersummary.component';
import { Header2Component } from './header-2/header-2.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, LoginComponent, RegistrationComponent, PaymentInformationComponent, EditProfileComponent,
    OrderDetailsComponent, AdminPortalComponent, AddMovieComponent, EditMovieComponent, CheckoutComponent, ChangePasswordComponent,
    VerifyAccountComponent, ManagePromotionsComponent, ManageMoviesComponent, HeaderComponent, RouterModule, FormsModule, CommonModule,
    SelectSeatComponent, SelectShowtimeComponent, OrderSummaryComponent, Header2Component, ReactiveFormsModule, ForgotPasswordComponent, ResetPasswordComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(public authService: AuthService) {}

  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   if (this.authService.isAuthenticated()) {
  //     this.authService.logout();
  //   }
  // }

}
