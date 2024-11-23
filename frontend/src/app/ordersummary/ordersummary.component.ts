import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderSummaryComponent {

  selectedSeats: { seat: string, type: string }[] = [];
  movie?: any;
  movieId?: number;
  movieName: string = '';
  show?: any;
  showId?: number;
  timeString: string = '';

  ticketInfo = {
    children: 0,
    adult: 0,
    senior: 0
  };

  // NEED TO CHANGE
  prices = {
    child: 5.5,
    adult: 8.5,
    senior: 6.5
  };

  // Calculated properties for total costs
  get ticketTotal() {
    return this.getTotalCost();
  }

  //NEED TO CHANGE
  bookingFee = 3.00;

  get salesTax() {
    return this.getSalesTax();
  }
  get totalCost() {
    return this.ticketTotal + this.bookingFee + this.salesTax;
  }


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedSeats = navigation.extras.state['selectedSeats'];
      this.movie = navigation.extras.state['movie'];
      this.movieId = navigation.extras.state['movieId'];
      this.movieName = navigation.extras.state['movieName'];
      this.show = navigation.extras.state['show'];
      this.showId = navigation.extras.state['showId'];
      this.timeString = navigation.extras.state['timeString'];
      this.ticketInfo.children = navigation.extras.state['childCount'];
      this.ticketInfo.adult = navigation.extras.state['adultCount'];
      this.ticketInfo.senior = navigation.extras.state['seniorCount'];
    }


  }
  

  getTotalCost() {
    return (this.ticketInfo.children * this.prices.child) +
           (this.ticketInfo.adult * this.prices.adult) +
           (this.ticketInfo.senior * this.prices.senior);
  }

  // NEED TO CHANGE
  getSalesTax() {
    return this.ticketTotal * 0.07;
  }

  // Function stubs for button actions
  // addTicket() { console.log('Adding a ticket...'); }
  // deleteTicket() { console.log('Deleting a ticket...'); }
  editBooking() { 
    this.router.navigate([`/book/${this.movieId}`], {
      state: {
        selectedSeats: this.selectedSeats,
        showId: this.showId,
        show: this.show,
      }
    });
  }
  proceedToCheckout() { 
    
  }
  cancelOrder() { 
    
  }
}
