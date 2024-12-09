import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// function paymentCardValidator(): ValidatorFn {
//   return (formGroup: AbstractControl): { [key: string]: any } | null => {
//     const cardNumber = formGroup.get('cardNumber')?.value;
//     const cardHolderName = formGroup.get('cardHolderName')?.value;
//     const expiryDate = formGroup.get('expiryDate')?.value;
//     const cvv = formGroup.get('cvv')?.value;

//     const isAnyFieldFilled = cardNumber || cardHolderName || expiryDate || cvv;
//     const isAllFieldsFilled = cardNumber && cardHolderName && expiryDate && cvv;

//     return isAnyFieldFilled && !isAllFieldsFilled ? { fieldsRequired: true } : null;
//   };
// }

function paymentCardValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const cardNumber = formGroup.get('cardNumber')?.value;
    const cardHolderName = formGroup.get('cardHolderName')?.value;
    const expiryDate = formGroup.get('expiryDate')?.value;
    const cvv = formGroup.get('cvv')?.value;

    // Checking if any field is filled
    const isAnyFieldFilled = cardNumber || cardHolderName || expiryDate || cvv;

    // Ensure all fields are filled if any one is filled
    const isAllFieldsFilled = cardNumber && cardHolderName && expiryDate && cvv;

    // If any field is filled but not all fields are filled, return an error object
    return isAnyFieldFilled && !isAllFieldsFilled ? { fieldsRequired: true } : null;
  };
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaymentInformationComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  disabled = false;
  used = false;
  selectedCard: string = '';

  promoCode: string = '';


  user: any;
  userId: number = -1;
  userPaymentCards: any = [];
  discountPercentage: number = 100;
  discount: number = 0;
  checkoutForm: FormGroup;

  tickets: { seatNumber: string, category: string, price: number, seatStatus: string }[] = [];
  movieName: string = '';
  showId: number = -1;
  timeString: string = '';

  numChildren: number = 0;
  numAdults: number = 0;
  numSeniors: number = 0;

  ticketTotal: number = 0;
  newTicketTotal: number = this.ticketTotal;
  bookingFee: number = 0;
  tax: number = 0;
  orderTotal: number = 0;

  booking?: any;



  

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.tickets = navigation.extras.state['selectedSeats'];
      this.movieName = navigation.extras.state['movieName'];
      this.showId = navigation.extras.state['showId'];
      this.timeString = navigation.extras.state['timeString'];
      this.numChildren = navigation.extras.state['childCount'];
      this.numAdults = navigation.extras.state['adultCount'];
      this.numSeniors = navigation.extras.state['seniorCount'];
      this.ticketTotal = navigation.extras.state['ticketTotal'];
      this.newTicketTotal = navigation.extras.state['ticketTotal'];
      this.bookingFee = navigation.extras.state['bookingFee'];
      this.tax = navigation.extras.state['tax'];
      this.orderTotal = navigation.extras.state['totalCost'];
    }

    this.checkoutForm = new FormGroup({
      userId: new FormControl(this.userId),
      movieName: new FormControl(this.movieName),
      showId: new FormControl(this.showId),
      tickets: new FormControl(this.tickets),
      numChildren: new FormControl(this.numChildren),
      numAdults: new FormControl(this.numAdults),
      numSeniors: new FormControl(this.numSeniors),
      ticketTotal: new FormControl(this.newTicketTotal),
      bookingFee: new FormControl(this.bookingFee),
      tax: new FormControl(this.tax),
      orderTotal: new FormControl(this.orderTotal),
      selectedCard: new FormControl(''), 
      promoCode: new FormControl(this.promoCode),
      paymentCard: this.createPaymentCard()
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
 
    this.http.get<any>('http://localhost:8080/user/profile', { headers }).subscribe((data: any) => {
      this.user = data;
      this.userId = data.id
      this.checkoutForm.get('userId')!.setValue(this.userId);
      this.userPaymentCards = data.paymentCards;
      console.log(this.user);
    });
  }

  useCard() {
    if (this.checkoutForm.get('paymentCard')!.valid) {
      alert('Card applied!');
      this.used = true;
    } else {
      alert('Please enter 16 digit card information, cardholder name, MM/YY expiry date, and 3 digit CVV accurately!');
    }
  }

  onCardSelected() {
    if (this.checkoutForm.get('selectedCard')!.value === '') {
        this.used = false;
    } else {
        this.used = true;
    }
  }


  applyPromo() {
    console.log(this.promoCode);
    if (this.checkoutForm.get('promoCode')!.value === '') {
      alert('Please enter a Promo Code before applying!');
      return;
    }

    const payload = {
      userToken: this.user.emailId,
      promoCode: this.checkoutForm.get('promoCode')!.value
    };

    this.http.post<any>('http://localhost:8080/api/promo/checkPromo', payload).subscribe({
      next: (data) => {
        const check: boolean = data.isValid;
        if (data.isValid) {
          this.discountPercentage = data.discountPercentage/100;
          this.discount = this.ticketTotal * this.discountPercentage;

          this.newTicketTotal = this.ticketTotal - this.discount;
          this.checkoutForm.get('ticketTotal')!.setValue(this.newTicketTotal);

          this.tax = this.newTicketTotal * 0.07;
          this.checkoutForm.get('tax')!.setValue(this.tax);

          this.orderTotal = this.newTicketTotal + this.tax + this.bookingFee;
          this.checkoutForm.get('orderTotal')!.setValue(this.orderTotal);

          this.disabled = true;
          alert('Promotion added successfully!');
        } else {
            alert('Error: ' + data.message);
            return;
        }
      },
      error: (error) => {
        alert('Error applying promo:' + (error.error.message || error.message));
      }
    });
  }

  confirmPurchase() {
    if (!this.used) {
      alert("Please select a method of payment!");
      return;
    }

    this.checkoutForm.removeControl('selectedCard');
    this.checkoutForm.removeControl('paymentCard');
    if(!this.disabled) {
      this.checkoutForm.removeControl('promoCode');
    }
    
    const booking = this.checkoutForm.value;
    console.log(booking);
    this.http.post('http://localhost:8080/api/bookings', booking).subscribe(
      (response: any) => {
        this.booking = response;
        alert('Booking successful!');
        this.router.navigate(['/order-details'], {
          state: {
            booking: this.booking,
            timeString: this.timeString
          }
        });
      },
      (error: any) => {
        alert('Booking failed: ' + error.error.message || 'Please try again.');
      }
    );


  }

  createPaymentCard(): FormGroup {
    return this.fb.group({
      cardNumber: ['', [Validators.required, this.validateCardNumber]],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', [Validators.required, this.validateExpiryDate]],
      cvv: ['', [Validators.required, this.validateCVV]]
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

}
