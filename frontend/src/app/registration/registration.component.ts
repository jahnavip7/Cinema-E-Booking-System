import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ 'mustMatch': true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

function paymentCardValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const cardNumber = formGroup.get('cardNumber')?.value;
    const cardHolder = formGroup.get('cardHolder')?.value;
    const expiryDate = formGroup.get('expiryDate')?.value;
    const cvv = formGroup.get('cvv')?.value;

    const isAnyFieldFilled = cardNumber || cardHolder || expiryDate || cvv;
    const isAllFieldsFilled = cardNumber && cardHolder && expiryDate && cvv;

    return isAnyFieldFilled && !isAllFieldsFilled ? { fieldsRequired: true } : null;
  };
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaymentInformationComponent,RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      promos: [false],
      paymentCards: this.fb.array([])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.addPaymentCard();
  }

    // Navigate to the verification page
    goToVerify(): void {
      this.router.navigate(['/verify']);
    }

  createPaymentCard(): FormGroup {
    return this.fb.group({
      cardNumber: ['', this.validateCardNumber],
      cardHolder: [''],
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

  get paymentCards(): FormArray {
    return this.registrationForm.get('paymentCards') as FormArray;
  }
  
  getCardFormGroup(index: number): FormGroup {
    return this.paymentCards.at(index) as FormGroup;
  }

  addPaymentCard(): void {
    // Check if the number of payment cards is less than 3
    if (this.paymentCards.length < 3) {
      this.paymentCards.push(this.createPaymentCard());
    } else {
      alert('You can only add up to 3 payment cards.');
    }
  }

  removePaymentCard(index: number): void {
    this.paymentCards.removeAt(index);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { confirmPassword, ...user } = this.registrationForm.value;
      user.active = false;
      console.log('User registered:', user);

      // Placeholder for API call
      // this.http.post('your-api-endpoint', user).subscribe(
      //   response => {
      //     console.log('Success:', response);
      //   },
      //   error => {
      //     console.error('Error:', error);
      //   }
      // );

      alert('Registration successful!');
      this.goToVerify();
    } else {
      this.displayErrorMessages();
    }
  }

  displayErrorMessages(): void {
    const controls = this.registrationForm.controls;
    let hasErrors = false; // Flag to track if any errors are displayed
  
    // Check for errors in main form controls
    if (controls['firstName'].hasError('required') || controls['lastName'].hasError('required') ||
        controls['email'].hasError('required') || controls['phoneNumber'].hasError('required') ||
        controls['password'].hasError('required') || controls['confirmPassword'].hasError('required') ||
        controls['address'].hasError('required') || controls['city'].hasError('required') ||
        controls['state'].hasError('required') || controls['zipCode'].hasError('required')) {
      alert('Please fill in all required fields.');
      hasErrors = true; // Set flag to true
    } else if (controls['email'].hasError('email')) {
      alert('Please enter a valid email address.');
      hasErrors = true; // Set flag to true
    } else if (controls['password'].hasError('minlength')) {
      alert('Password must be at least 6 characters long.');
      hasErrors = true; // Set flag to true
    } else if (controls['confirmPassword'].hasError('mustMatch')) {
      alert('Passwords do not match.');
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
  
  
} 



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { PaymentInformationComponent } from '../payment-information/payment-information.component';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';

// // Validator to ensure password fields match
// function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];

//     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//       return;
//     }

//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ 'mustMatch': true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   };
// }

// // Custom validator for optional payment card fields
// function paymentCardValidator(): ValidatorFn {
//   return (formGroup: AbstractControl): { [key: string]: any } | null => {
//     const cardNumber = formGroup.get('cardNumber')?.value;
//     const cardHolder = formGroup.get('cardHolder')?.value;
//     const expiryDate = formGroup.get('expiryDate')?.value;
//     const cvv = formGroup.get('cvv')?.value;

//     const isAnyFieldFilled = cardNumber || cardHolder || expiryDate || cvv;
//     const isAllFieldsFilled = cardNumber && cardHolder && expiryDate && cvv;

//     return isAnyFieldFilled && !isAllFieldsFilled ? { fieldsRequired: true } : null;
//   };
// }

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, PaymentInformationComponent, RouterModule],
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.scss']
// })
// export class RegistrationComponent implements OnInit {
//   registrationForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.registrationForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phoneNumber: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//       address: ['', Validators.required],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//       zipCode: ['', Validators.required],
//       promos: [false],
//       paymentCards: this.fb.array([])  // Form array for payment cards
//     }, {
//       validator: MustMatch('password', 'confirmPassword')  // Validator to check password match
//     });
//   }

//   ngOnInit(): void {
//     this.addPaymentCard();
//   }

//   // Create a new payment card form group
//   createPaymentCard(): FormGroup {
//     return this.fb.group({
//       cardNumber: ['', this.validateCardNumber],
//       cardHolder: [''],
//       expiryDate: ['', this.validateExpiryDate],
//       cvv: ['', this.validateCVV]
//     }, { validators: paymentCardValidator() });
//   }

//   // Custom validators for payment card fields
//   validateCardNumber(control: AbstractControl) {
//     if (control.value && control.value.length !== 16) {
//       return { pattern: true };
//     }
//     return null;
//   }

//   validateCVV(control: AbstractControl) {
//     if (control.value && control.value.length !== 3) {
//       return { pattern: true };
//     }
//     return null;
//   }

//   validateExpiryDate(control: AbstractControl) {
//     const value = control.value;
//     const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
//     if (value && !regex.test(value)) {
//       return { pattern: true };
//     }
//     return null;
//   }

//   // Getter for the payment cards form array
//   get paymentCards(): FormArray {
//     return this.registrationForm.get('paymentCards') as FormArray;
//   }

//   // Add a new payment card to the array (up to 3)
//   addPaymentCard(): void {
//     if (this.paymentCards.length < 3) {
//       this.paymentCards.push(this.createPaymentCard());
//     } else {
//       alert('You can only add up to 3 payment cards.');
//     }
//   }

//   // Remove a payment card from the array
//   removePaymentCard(index: number): void {
//     this.paymentCards.removeAt(index);
//   }

//   // Form submission logic
//   onSubmit(): void {
//     if (this.registrationForm.valid) {
//       const { confirmPassword, ...user } = this.registrationForm.value;
//       user.active = false;
//       console.log('User registered:', user);

//       // Placeholder for API call
//       // this.http.post('your-api-endpoint', user).subscribe(
//       //   response => {
//       //     console.log('Success:', response);
//       //   },
//       //   error => {
//       //     console.error('Error:', error);
//       //   }
//       // );

//       alert('Registration successful!');
//       this.goToVerify();  // Navigate to the verification page after successful registration
//     } else {
//       this.displayErrorMessages();
//     }
//   }

//   // Navigate to the verification page
//   goToVerify(): void {
//     this.router.navigate(['/verify']);
//   }

//   // Error message display logic
//   displayErrorMessages(): void {
//     const controls = this.registrationForm.controls;
//     let hasErrors = false;
  
//     // Check for required fields in the main form
//     if (controls['firstName'].hasError('required') || controls['lastName'].hasError('required') ||
//         controls['email'].hasError('required') || controls['phoneNumber'].hasError('required') ||
//         controls['password'].hasError('required') || controls['confirmPassword'].hasError('required') ||
//         controls['address'].hasError('required') || controls['city'].hasError('required') ||
//         controls['state'].hasError('required') || controls['zipCode'].hasError('required')) {
//       alert('Please fill in all required fields.');
//       hasErrors = true;
//     } else if (controls['email'].hasError('email')) {
//       alert('Please enter a valid email address.');
//       hasErrors = true;
//     } else if (controls['password'].hasError('minlength')) {
//       alert('Password must be at least 6 characters long.');
//       hasErrors = true;
//     } else if (controls['confirmPassword'].hasError('mustMatch')) {
//       alert('Passwords do not match.');
//       hasErrors = true;
//     }
  
//     // Check errors in payment cards
//     for (let i = 0; i < this.paymentCards.length; i++) {
//       const cardGroup = this.paymentCards.at(i) as FormGroup;

//       if (cardGroup.get('cardNumber')?.hasError('pattern') && cardGroup.get('cardNumber')?.touched) {
//         alert(`Card number in card ${i + 1} must be exactly 16 digits if filled.`);
//         hasErrors = true;
//       }
  
//       if (cardGroup.get('cvv')?.hasError('pattern') && cardGroup.get('cvv')?.touched) {
//         alert(`CVV in card ${i + 1} must be exactly 3 digits if filled.`);
//         hasErrors = true;
//       }

//       if (cardGroup.get('expiryDate')?.hasError('pattern') && cardGroup.get('expiryDate')?.touched) {
//         alert(`Expiry date in card ${i + 1} must be in MM/YY format if filled.`);
//         hasErrors = true;
//       }

//       if (cardGroup.hasError('fieldsRequired') && cardGroup.touched) {
//         alert(`All fields in card ${i + 1} must be filled if one is filled.`);
//         hasErrors = true;
//       }
//     }
  
//     // General error alert if no other errors were displayed
//     if (!hasErrors) {
//       alert('Please correct the errors in the form.');
//     }
//   }
// }
