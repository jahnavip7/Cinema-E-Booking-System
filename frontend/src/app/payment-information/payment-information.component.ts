import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, CommonModule],
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent {
  @Input() formGroup!: FormGroup;  // Each payment card is a FormGroup

  constructor() { }

  // Remove a payment card
  removePaymentCard(index: number): void {
    // Notify the parent component to remove the card from FormArray
  }
}
