import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { ProfileSuccessDialogComponent } from "../profile-success-dialog/profile-success-dialog.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
 

function paymentCardValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const cardNumber = formGroup.get('cardNumber')?.value;
    const cardHolderName = formGroup.get('cardHolderName')?.value;
    const expiryDate = formGroup.get('expiryDate')?.value;
    const cvv = formGroup.get('cvv')?.value;

    const isAnyFieldFilled = cardNumber || cardHolderName || expiryDate || cvv;
    const isAllFieldsFilled = cardNumber && cardHolderName && expiryDate && cvv;

    return isAnyFieldFilled && !isAllFieldsFilled ? { fieldsRequired: true } : null;
  };
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, PaymentInformationComponent, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      promotionPreference: [false],
      paymentCards: this.fb.array([this.createPaymentCard()])  // Similar to registration form
    });
  }
 
  ngOnInit(): void {
    this.loadProfile();
  }
 
  // Helper method to get the paymentCards FormArray
  get paymentCards(): FormArray {
    return this.editProfileForm.get('paymentCards') as FormArray;
  }
 
  createPaymentCard(): FormGroup {
    return this.fb.group({
      cardNumber: ['', this.validateCardNumber],
      cardHolderName: [''],
      expiryDate: ['', this.validateExpiryDate],
      cvv: ['', this.validateCVV]
    }, { validators: paymentCardValidator() });
  }


  validateCardNumber(control: AbstractControl) {
    if (control.value && control.value.length !== 16) {
      return { pattern: true };
    }
    return null;
  }

  validateCVV(control: AbstractControl) {
    if (control.value && control.value.length !== 3) {
      return { pattern: true };
    }
    return null;
  }
  validateExpiryDate(control: AbstractControl) {
    const value = control.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (value && !regex.test(value)) {
      return { pattern: true };
    }
    return null;
  }
 
  // Create a payment card form group with existing values
  createPaymentCardWithValues(card: any): FormGroup {
    return this.fb.group({
      cardNumber: [card.cardNumber, Validators.required],
      cardHolderName: [card.cardHolderName, Validators.required],
      expiryDate: [card.expiryDate, Validators.required],
      cvv: [card.cvv, Validators.required]
    });
  }
 
  // Load the profile and populate the form with existing data
  loadProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
 
    this.http.get('http://localhost:8080/user/profile', { headers }).subscribe((data: any) => {
      this.editProfileForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNo: data.mobileNo,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        promotionPreference: data.promotionPreference
      });
 
      // Add payment cards to FormArray if available
      if (data.paymentCards && data.paymentCards.length > 0) {
        const paymentArray = this.paymentCards;
        paymentArray.clear(); // Clear existing payment cards
        data.paymentCards.forEach((card: any) => {
          paymentArray.push(this.createPaymentCardWithValues(card));
        });
      }
    });
  }
 
  // Add a new payment card to the form array
  addPaymentCard(): void {
    if (this.paymentCards.length < 3) {
      this.paymentCards.push(this.createPaymentCard());
    } else {
      alert('You can only add up to 3 payment cards.');
    }
  }
 
  // Remove a payment card from the form array
  removePaymentCard(index: number): void {
    this.paymentCards.removeAt(index);
  }
 
  // Helper function to retrieve the FormGroup for each payment card
  getCardFormGroup(index: number): FormGroup {
    return this.paymentCards.at(index) as FormGroup;
  }
 
  // Submit the form and handle profile update
  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const token = localStorage.getItem('authToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const user = this.editProfileForm.value;
      const nonEmptyPaymentCards = user.paymentCards.filter((card: any) => {
        return card.cardNumber && card.cardHolderName && card.expiryDate && card.cvv;
      });
      if (nonEmptyPaymentCards.length !=0)
        user.paymentCards = nonEmptyPaymentCards;
      else
        console.log(nonEmptyPaymentCards.length)
        // user.paymentCards = [];
 
      this.http.put('http://localhost:8080/user/editProfile', user, { headers }).subscribe(
          (response) => {
            console.log('Profile updated successfully.');
            // Show dialog and redirect after close
            const dialogRef = this.dialog.open(ProfileSuccessDialogComponent);
            dialogRef.afterClosed().subscribe(() => {
              this.router.navigate(['/home']);
            });
          },
          (error) => {
            console.error('Error updating profile', error);
          }
        );
    } else {
      this.displayErrorMessages();
    }
  }

  displayErrorMessages(): void {
    const controls = this.editProfileForm.controls;
    let hasErrors = false; // Flag to track if any errors are displayed

    // Check for errors in main form controls
    if (controls['firstName'].hasError('required') || controls['lastName'].hasError('required') || controls['mobileNo'].hasError('required') ||
        controls['address'].hasError('required') || controls['city'].hasError('required') ||
        controls['state'].hasError('required') || controls['zipcode'].hasError('required')) {
      alert('Please fill in all required fields.');
      hasErrors = true; // Set flag to true
    }

    for (let i = 0; i < this.paymentCards.length; i++) {
      const cardGroup = this.paymentCards.at(i) as FormGroup;

      // Card number validation
      if (cardGroup.get('cardNumber')?.hasError('pattern') && cardGroup.get('cardNumber')?.touched) {
        alert(`Card number in card ${i + 1} must be exactly 16 digits if filled.`);
        hasErrors = true; // Set flag to true
      }

      // CVV validation
      if (cardGroup.get('cvv')?.hasError('pattern') && cardGroup.get('cvv')?.touched) {
        alert(`CVV in card ${i + 1} must be exactly 3 digits if filled.`);
        hasErrors = true; // Set flag to true
      }

      // Expiry date validation
      if (cardGroup.get('expiryDate')?.hasError('pattern') && cardGroup.get('expiryDate')?.touched) {
        alert(`Expiry date in card ${i + 1} must be in MM/YY format if filled.`);
        hasErrors = true; // Set flag to true
      }

      // Check for fields required error
      if (cardGroup.hasError('fieldsRequired') && cardGroup.touched) {
        alert(`All fields in card ${i + 1} must be filled if one is filled.`);
        hasErrors = true; // Set flag to true
      }

    }

    // Show generic alert only if no other errors were displayed
    if (!hasErrors) {
      alert('Please correct the errors in the form.');
    }
  }
 
  // Navigate to the change password route
  goToChange(): void {
    this.router.navigate(['/change']);
  }
}