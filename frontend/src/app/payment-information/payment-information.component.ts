import { Component, Input } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss'],
  // template: `
  //   <div [formGroup]="formGroup">
  //     <label>Card Number</label>
  //     <input type="text" formControlName="cardNumber"/>

  //     <label>Card Holder Name</label>
  //     <input type="text" formControlName="cardHolderName"/>

  //     <label>Expiry Date (MM/YY)</label>
  //     <input type="text" formControlName="expiryDate"/>

  //     <label>CVV</label>
  //     <input type="text" formControlName="cvv"/>
  //   </div>
  // `,
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class PaymentInformationComponent {
  @Input() formGroup!: FormGroup;
}
