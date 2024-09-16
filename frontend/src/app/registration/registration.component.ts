import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [PaymentInformationComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

}
