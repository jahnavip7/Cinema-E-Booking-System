import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent {
  @Input() paymentForm!: FormGroup;  // OLD

  // NEW: Replace paymentForm with paymentCards FormArray
  @Input() paymentCards!: FormArray;

  constructor() {}

  // Add a new payment card form group to the FormArray
  addPaymentCard(): void {
    this.paymentCards.push(this.createPaymentFormGroup());
  }

  // Create a new payment card form group
  createPaymentFormGroup(): FormGroup {
    return new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    });
  }

  // Remove a card from the FormArray
  removePaymentCard(index: number): void {
    this.paymentCards.removeAt(index);
  }
}
