import { Component, OnInit } from '@angular/core';
import { HideCardPipe } from '../pipes/hide-card.pipe';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [PaymentInformationComponent, CurrencyPipe, ReactiveFormsModule, HideCardPipe, NgForOf],
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  disabled = false;
  used = false;
  selectedCard: string = '';
  promoCode: string = '';
  user: any;
  userId: number = -1;
  userPaymentCards: any[] = [];
  discountPercentage: number = 0;
  discount: number = 0;
  checkoutForm: FormGroup;
  tickets: { seatNumber: string; category: string; price: number; seatStatus: string }[] = [];
  movieName: string = '';
  showId: number = -1;
  timeString: string = '';
  numChildren: number = 0;
  numAdults: number = 0;
  numSeniors: number = 0;
  ticketTotal: number = 0;
  newTicketTotal: number = 0;
  bookingFee: number = 0;
  tax: number = 0;
  orderTotal: number = 0;
  booking?: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state;
      this.tickets = state['selectedSeats'] || [];
      this.movieName = state['movieName'] || '';
      this.showId = state['showId'] || -1;
      this.timeString = state['timeString'] || '';
      this.numChildren = state['childCount'] || 0;
      this.numAdults = state['adultCount'] || 0;
      this.numSeniors = state['seniorCount'] || 0;
      this.ticketTotal = state['ticketTotal'] || 0;
      this.newTicketTotal = this.ticketTotal;
      this.bookingFee = state['bookingFee'] || 0;
      this.tax = state['tax'] || 0;
      this.orderTotal = state['totalCost'] || 0;
    }

    this.checkoutForm = this.fb.group({
      userId: [this.userId],
      movieName: [this.movieName],
      showId: [this.showId],
      tickets: [this.tickets],
      numChildren: [this.numChildren],
      numAdults: [this.numAdults],
      numSeniors: [this.numSeniors],
      ticketTotal: [this.newTicketTotal],
      bookingFee: [this.bookingFee],
      tax: [this.tax],
      orderTotal: [this.orderTotal],
      selectedCard: [''],
      promoCode: [{ value: '', disabled: this.disabled }],
      paymentCard: this.fb.group(
        {
          cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
          cardHolderName: ['', Validators.required],
          expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
          cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
        },
        { validators: this.paymentCardValidator() }
      ),
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any>('http://localhost:8080/user/profile', { headers }).subscribe(
      (data) => {
        this.user = data;
        this.userId = data.id;
        this.userPaymentCards = data.paymentCards || []; // Store cards from profile
        this.checkoutForm.get('userId')!.setValue(this.userId);
      },
      (error) => {
        console.error('Failed to load user profile:', error);
        alert('Failed to load user profile.');
      }
    );
  }



  paymentCardValidator(): ValidatorFn {
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

  get paymentCardGroup(): FormGroup {
    return this.checkoutForm.get('paymentCard') as FormGroup;
  }

  useCard() {
    if (this.paymentCardGroup.valid) {
      alert('Card applied!');
      this.used = true;
    } else {
      alert('Please enter valid card details!');
    }
  }

  onCardSelected(event: Event): void {
    const selectedCardNumber = (event.target as HTMLSelectElement).value;
    const selectedCard = this.userPaymentCards.find(card => card.cardNumber === selectedCardNumber);

    if (selectedCard) {
      this.paymentCardGroup.get('cardNumber')!.setValue(selectedCard.cardNumber);
      this.paymentCardGroup.get('cardHolderName')!.setValue(selectedCard.cardHolderName);
      this.paymentCardGroup.get('expiryDate')!.setValue(selectedCard.expiryDate);
      this.paymentCardGroup.get('cvv')!.setValue(selectedCard.cvv);
    }
  }


  applyPromo() {
    // Ensure promo code is provided
    const promoCode = this.checkoutForm.get('promoCode')?.value;
    if (!promoCode) {
      alert('Please enter a promo code.');
      return;
    }

    const payload = { userToken: this.user.emailId, promoCode };

    // Call the backend to validate and apply the promo code
    this.http.post<any>('http://localhost:8080/api/promo/checkPromo', payload).subscribe(
      (data) => {
        if (data.isValid) {
          if(!data.isUsed){
            this.discountPercentage = data.discountPercentage;
            this.discount = (this.ticketTotal * this.discountPercentage) / 100;
            this.newTicketTotal = this.ticketTotal - this.discount;
            this.checkoutForm.get('ticketTotal')!.setValue(this.newTicketTotal);
            this.tax = this.newTicketTotal * 0.07; // Assuming a 7% tax rate
            this.checkoutForm.get('tax')!.setValue(this.tax);
            this.orderTotal = this.newTicketTotal + this.tax + this.bookingFee;
            this.checkoutForm.get('orderTotal')!.setValue(this.orderTotal);

            // Disable the promo code input field after successful application
            this.checkoutForm.get('promoCode')?.disable();
            this.disabled = true;

            alert('Promo applied successfully!');
          }
          else{
            alert('Promo is already Used!!');
          }

        } else {
          alert(data.message || 'Invalid or expired promo code.');
        }
      },
      (error) => {
        console.error('Error applying promo code:', error);
        alert('Failed to apply promo code. Please try again.');
      }
    );
  }


  confirmPurchase() {
    if (!this.used) {
      alert('Please select a payment method.');
      return;
    }


    this.http.post('http://localhost:8080/api/bookings', this.checkoutForm.value).subscribe(
      (response) => {
        alert('Booking successful!');
        this.router.navigate(['/order-details'], { state: { booking: response, timeString: this.timeString } });
      },
      (error) => {
        console.error('Booking failed:', error);
        alert('Booking failed.');
      }
    );
  }
}
