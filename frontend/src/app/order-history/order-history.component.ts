import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    NgForOf,
    NgIf
  ]
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = []; // Array to store order history
  userId: number = 27; // Replace with dynamic user ID if needed

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    this.http.get<any[]>(`http://localhost:8080/api/bookings/user/${this.userId}`).subscribe({
      next: (data) => {
        this.orders = data; // Assign the response to the orders array
      },
      error: (error) => {
        console.error('Error fetching order history:', error);
        alert('Failed to fetch order history.');
      },
    });
  }

  viewOrderDetails(order: any): void {
    this.router.navigate(['/order-details'], { state: { booking: order } });
  }
}
