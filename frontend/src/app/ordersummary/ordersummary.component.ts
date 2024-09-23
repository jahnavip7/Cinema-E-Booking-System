import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderSummaryComponent {
  userName = 'User';  // Placeholder for the user's name

  // Initializations with defaults or empty values
  selectedSeats: { seat: string, type: string }[] = [];
  movieTitle: string = '';
  showTime: Date = new Date();

  // Ticket and Pricing Information
  ticketInfo = {
    children: 1,
    adult: 2,
    senior: 0
  };

  prices = {
    child: 5.5,
    adult: 8.5,
    senior: 6.5
  };

  // Calculated properties for total costs
  get ticketTotal() {
    return this.getTotalCost();
  }
  onlineFee = 3.00;
  get salesTax() {
    return this.getSalesTax();
  }
  get totalCost() {
    return this.ticketTotal + this.onlineFee + this.salesTax;
  }


  constructor(private router: Router) {
    // Retrieve navigation state passed from previous component
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedSeats = navigation.extras.state['selectedSeats'] || [];
      this.movieTitle = navigation.extras.state['movieTitle'] || 'Unknown Movie';
      this.showTime = navigation.extras.state['showTime'] ? new Date(navigation.extras.state['showTime']) : new Date();
    }
  }
  

  getTotalCost() {
    return (this.ticketInfo.children * this.prices.child) +
           (this.ticketInfo.adult * this.prices.adult) +
           (this.ticketInfo.senior * this.prices.senior);
  }

  getSalesTax() {
    return this.ticketTotal * 0.07;  // Assuming 7% tax
  }

  // Function stubs for button actions
  addTicket() { console.log('Adding a ticket...'); }
  deleteTicket() { console.log('Deleting a ticket...'); }
  editBooking() { console.log('Editing the booking...'); }
  proceedToCheckout() { console.log('Proceeding to checkout...'); }
  cancelOrder() { console.log('Cancelling the order...'); }
}
