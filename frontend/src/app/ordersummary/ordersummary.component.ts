import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-summary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderSummaryComponent {

  selectedSeats: { seatNumber: string, category: string, price: number, seatStatus: string }[] = [];
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
    child: 0,
    adult: 0,
    senior: 0,
    bookingFee: 0
  };

  // Calculated properties for total costs
  get ticketTotal() {
    return this.getTotalCost();
  }


  get salesTax() {
    return this.getSalesTax();
  }
  get totalCost() {
    return this.ticketTotal + this.prices.bookingFee + this.salesTax;
  }

  constructor(private router: Router, private http: HttpClient) {
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

  ngOnInit() {
    this.fetchPrices();
  }
  
  fetchPrices(): void {
    this.http.get<any>('http://localhost:8080/api/prices').subscribe({
      next: (data) => {
        this.prices.child = data.childPrice;
        this.prices.adult = data.adultPrice;
        this.prices.senior = data.seniorPrice;
        this.prices.bookingFee = data.onlineBookingFee;
      },
      error: (error) => {
        alert('Error fetching prices: ' + (error.error.message || error.message));
      }
    });
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

      for (let seat of this.selectedSeats) {
        switch (seat.category) {
          case 'Child':
            seat.price = this.prices.child;
            break;
          case 'Adult':
            seat.price = this.prices.adult;
            break;
          case 'Senior':
            seat.price = this.prices.senior;
            break;
        }
      }

    this.router.navigate(['/checkout'], {
      state: {

        movieName: this.movieName,

        selectedSeats: this.selectedSeats,
        showId: this.showId,
        show: this.show,
        timeString: this.timeString,

        childCount: this.ticketInfo.children,
        adultCount: this.ticketInfo.adult,
        seniorCount: this.ticketInfo.senior,

        ticketTotal: this.ticketTotal,
        bookingFee: this.prices.bookingFee,
        tax: this.salesTax,
        totalCost: this.totalCost

      }
    });
  }

  cancelOrder() { 
    this.router.navigate(['']);
  }
}
