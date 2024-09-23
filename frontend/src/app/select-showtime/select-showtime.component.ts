import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-showtime',
  templateUrl: './select-showtime.component.html',
  styleUrls: ['./select-showtime.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]  // Import FormsModule here
})
export class SelectShowtimeComponent {
  userName = 'User';  // Hardcoded username, can be replaced with dynamic data

  showtimes: string[] = [
    'Barbie - 2023-11-06 - 15:30',
    'Barbie - 2023-11-07 - 18:00',
    'Barbie - 2023-12-01 - 12:00'
  ];

  selectedShowtime: string = this.showtimes[0];  // Default selected showtime
}
