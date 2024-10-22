import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [PaymentInformationComponent, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form with controls, including the nested paymentForm
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      receivePromotions: [false],
      paymentCards: this.fb.array([])  // Initialize paymentCards as a FormArray
    });
  }

  ngOnInit(): void {
    this.loadProfile(); // Load the existing profile data into the form
  }

  // Helper method to return the form array
  get paymentCards(): FormArray {
    return this.editProfileForm.get('paymentCards') as FormArray;
  }

  // Helper to create a new payment card form group
  createPaymentFormGroup(): FormGroup {
    return this.fb.group({
      cardNumber: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  loadProfile(): void {
    // Make an API call to load the user's profile data and patch the form
    this.http.get('http://localhost:8080/user/profile').subscribe((data: any) => {
      this.editProfileForm.patchValue(data);

      // If payment cards are present in the response, set the form array
      if (data.paymentCards && data.paymentCards.length > 0) {
        const paymentArray = this.paymentCards;
        data.paymentCards.forEach((card: any) => {
          paymentArray.push(this.fb.group(card));  // Add each card to the FormArray
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      // Set the headers with the JWT token
      const headers = { 'Authorization': `Bearer ${token}` };

      this.http.put('http://localhost:8080/user/editProfile', this.editProfileForm.value, { headers })
        .subscribe(
          (response) => {
            console.log('Profile updated successfully.');
          },
          (error) => {
            console.error('Error updating profile', error);
          }
        );
    }
  }


  goToChange() {
    // Navigate to change password page
    this.router.navigate(['/change']);
  }
}
