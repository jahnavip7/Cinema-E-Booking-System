import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegistrationComponent, PaymentInformationComponent, EditProfileComponent, 
    OrderDetailsComponent, AdminPortalComponent, AddMovieComponent, EditMovieComponent, CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
