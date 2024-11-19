import {Component, ViewChild, HostListener, OnInit} from '@angular/core';
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
import { ScheduleMovieComponent } from './schedule-movie/schedule-movie.component';
import { Header3Component } from './header-3/header-3.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    LoginComponent, 
    RegistrationComponent, 
    PaymentInformationComponent, 
    EditProfileComponent,
    OrderDetailsComponent, 
    AdminPortalComponent, 
    AddMovieComponent, 
    EditMovieComponent, 
    CheckoutComponent, 
    ChangePasswordComponent,
    VerifyAccountComponent, 
    ManagePromotionsComponent, 
    ManageMoviesComponent, 
    HeaderComponent, 
    RouterModule, 
    FormsModule, 
    CommonModule,
    SelectSeatComponent, 
    SelectShowtimeComponent, 
    OrderSummaryComponent, 
    Header2Component,
    Header3Component, 
    ReactiveFormsModule, 
    ForgotPasswordComponent, 
    ResetPasswordComponent,
    ScheduleMovieComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
  //   if (localStorage.getItem('Role') === 'USER')
  //     this.router.navigate(['']);
  //   else
  //     this.router.navigate(['/admin-portal']);
  // }

      // Check if localStorage is defined
      if (typeof localStorage !== 'undefined') {
        const role = localStorage.getItem('Role');
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-portal']);
        } else {
          this.router.navigate(['']);
        }
      }
    }


}
