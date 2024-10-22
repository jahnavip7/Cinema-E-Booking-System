import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { ProfileSuccessDialogComponent } from "../profile-success-dialog/profile-success-dialog.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
      receivePromotions: [false],
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

  // Create a blank payment card form group
  createPaymentCard(): FormGroup {
    return this.fb.group({
      cardNumber: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
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
        receivePromotions: data.receivePromotions
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

      this.http.put('http://localhost:8080/user/editProfile', this.editProfileForm.value, { headers })
        .subscribe(
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
    }
  }

  // Navigate to the change password route
  goToChange(): void {
    this.router.navigate(['/change-password']);
  }
}
