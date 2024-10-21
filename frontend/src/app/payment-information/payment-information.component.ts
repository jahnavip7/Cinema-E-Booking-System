import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss']
  // template: `
  //   <div [formGroup]="paymentForm">
  //     <div class="card">
  //       <div class="card-section">
  //         <input class="form-input" formControlName="cardNumber" placeholder="9999 9999 9999 9999">
  //         <label class="form-label">Card Number</label>
  //       </div>
  //       <div class="card-section">
  //         <input class="form-input" formControlName="cardHolder" placeholder="John Doe">
  //         <label class="form-label">Cardholder Name</label>
  //       </div>
  //       <div class="exp-cvv">
  //         <div class="card-section">
  //           <input class="form-input" formControlName="expiryDate" style="width: 60%;" placeholder="MM/YYYY">
  //           <label class="form-label">Expiration</label>
  //         </div>
  //         <div class="card-section">
  //           <input class="form-input" formControlName="cvv" style="width: 40%;" placeholder="CVV">
  //           <label class="form-label">CVV</label>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // `
})
export class PaymentInformationComponent {
  @Input() paymentForm!: FormGroup;
}
