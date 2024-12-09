import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaymentInformationComponent, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  disabled = false;
  promoCode: string = '';
  user: any;
  paymentCards: any = [];
  discountPercentage: number = 100;
  discount: number = 0;
  totalPrice: number = 0;
  newTotalPrice: number = this.totalPrice;

  

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
 
    this.http.get<any>('http://localhost:8080/user/profile', { headers }).subscribe((data: any) => {
      this.user = data;
      this.paymentCards = data.paymentCards;
      console.log(this.user);
    });
  }

  applyPromo() {

    console.log(this.promoCode);
    if (this.promoCode === '') {
      alert('Please enter a Promo Code before applying!');
      return;
    }

    const payload = {
      userToken: this.user.emailId,
      promoCode: this.promoCode
    };

    this.http.post<any>('http://localhost:8080/api/promo/checkPromo', payload).subscribe({
      next: (data) => {
        const check: boolean = data.isValid;
        if (data.isValid) {
          this.discountPercentage = data.discountPercentage/100;
          this.discount = this.totalPrice * this.discountPercentage;
          this.newTotalPrice = this.totalPrice - this.discount;
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

}
