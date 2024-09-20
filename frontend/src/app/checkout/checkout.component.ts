import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaymentInformationComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

}
