import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  booking?: any;
  timeString: string = '';
  formattedSeats: string = '';


  constructor(private http: HttpClient, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.booking = navigation.extras.state['booking'];
      this.timeString = navigation.extras.state['timeString'];
    }
  }

  ngOnInit() {
    this.formattedSeats = this.formatSeatString(this.booking.tickets);
    console.log(this.booking);
  }

  formatSeatString(tickets: { seatNumber: string }[]): string {
    const seatNumbers = tickets.map(ticket => ticket.seatNumber);
    return "Seats: " + seatNumbers.join(', ');
  }

}
